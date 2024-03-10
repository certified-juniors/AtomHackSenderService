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
        this.files = files;
        // Размер файла с вложениями в мегабитах
        this.size = 0;
    }

    handle() {
        console.log("Starting handling message");
        for (let period of periods) {
            console.log("Period: ", period);
            console.log("IF: ", !period.isPassed(), period.capacity >= this.size, calculateAllowedSize(new Date(Date.now()).toISOString(), periods.end_time, period.speed) >= this.size);
            if (!period.isPassed() && period.capacity >= this.size && calculateAllowedSize(new Date(Date.now()).toISOString(), period.end_time, period.speed) >= this.size) {
                console.log("Added message", this);
                period.addMessage(this);
                return;
            }
        }
        console.log("Added to unhandled message: ", this);
        unhandledMessages.push(this);
    }

    async send() {
        // Отправка сообщения
        console.log("STARTING SENDING MESSAGE");
        try {
            const formData = new FormData();

            formData.append('id', this.id);
            formData.append('title', this.title);
            formData.append('owner', this.owner);
            formData.append('sentTime', new Date().toISOString());
            formData.append('createdAt', this.createdAt);
            formData.append('payload', this.payload);

            console.log("Downloading files from MinIO");
            if (this.files.length > 0) {
                const downloadedFiles = await downloadFilesFromBucket(this.files);
                downloadedFiles.map(({ file, name }) => {
                    console.log("FILE DEFAULT: ", file);
                    const blob = new Blob([file]);
                    // blob.name = 
                    formData.append('files', blob, name);
                    console.log('typeof file.buffer', typeof formData["files"])
                });
            };

            console.log('Sending request to:', process.env.DS_URL);

            console.log('Form Data payload: ', formData);

            const response = await axios.post(`${process.env.DS_URL}/api/document/send-to-earth`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Message sended successfully!', response.data);

            await axios.put(`${process.env.MARS_HOST}:${process.env.MARS_PORT}/api/v1/document/${this.id}/status`);
            console.log('Status updated successfully!');
        } catch (error) {
            console.error('Error while resending message: ', error)
        }
    }
}

module.exports = {
    Message,
};