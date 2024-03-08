const { periods, unhandledMessages } = require('./period');
const { downloadFilesFromBucket } = require('./storage/minio');
const { calculateFileSize, calculateAllowedSize } = require('./utils/helpers');
const axios = require('axios');
const fs = require('fs');

class Message {
    constructor(jsonString) {
        const {
            id,
            title,
            owner,
            createdAt,
            payload,
            files
        } = JSON.parse(jsonString);

        this.id = id;
        this.title = title;
        this.owner = owner;
        this.createdAt = createdAt;
        this.payload = payload;
        this.files = downloadFilesFromBucket(files);
        // Размер файла с вложениями в мегабитах
        this.size = calculateFileSize(jsonString);
    }

    handle() {
        for (let period of periods) {
            if (!period.isPassed() && period.capacity >= this.size && calculateAllowedSize(new Date(Date.now()).toISOString(), period.end_time, period.speed) >= this.size) {
                period.addMessage(this);
                return;
            }
        }
        unhandledMessages.push(this);
    }

    async send() {
        // Отправка сообщения
        try {
            const formData = new FormData();

            this.files.forEach(file => {
                formData.append('files', fs.createReadStream(file.path), {
                    filename: file.originalname,
                    contentType: file.mimetype
                });
            });
            const queryString = `?id=${this.id}&title=${this.title}&owner=${this.owner}&createdAt=${this.createdAt}&payload=${this.payload}`;

            const response = await axios.post(`${process.env.DS_HOST}:${process.env.DS_PORT}/api${queryString}`, formData, {
                'Content-Type': 'multipart/form-data',
            });

            console.log('Message sended successfully!', response);
        } catch (error) {
            console.error('Error while resending message: ', error.code)
        }
    }
}

module.exports = {
    Message,
};