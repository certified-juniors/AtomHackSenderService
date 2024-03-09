const minio = require('minio');
const axios = require('axios');

require('dotenv').config();

const bucketName = process.env.MARS_MINIO_BUCKET;

const minioClient = new minio.Client({
    endPoint: process.env.MARS_MINIO_HOST,
    port: Number(process.env.MARS_MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MARS_MINIO_ROOT_USER,
    secretKey: process.env.MARS_MINIO_ROOT_PASSWORD,
});

const downloadFilesFromBucket = (urls) => {
    const filesData = [];

    if (urls) {
        for (let index = 0; index < urls.length; index++) {
            const url = urls[index];
            axios.get(url, {
                responseType: 'stream',
            })
            .then((response) => {
                console.log('MINIO RESPONSE: ', response);
                filesData.push(response.data);
            })
            .catch(error => {
                console.error("Error while downloading files from minio: ", error);
            })
        }
        console.log("All files downloaded successfully!");
    } else {
        console.log("No files in report");
    }

    return filesData;
};

module.exports = {
    downloadFilesFromBucket,
};
