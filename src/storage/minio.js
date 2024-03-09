const minio = require('minio');

require('dotenv').config();

const bucketName = process.env.MARS_MINIO_BUCKET;

const minioClient = new minio.Client({
    endPoint: process.env.MARS_MINIO_HOST,
    port: Number(process.env.MARS_MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MARS_MINIO_ROOT_USER,
    secretKey: process.env.MARS_MINIO_ROOT_PASSWORD,
});

module.exports = {
    downloadFilesFromBucket,
};
