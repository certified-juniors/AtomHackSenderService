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

const downloadFilesFromBucket = async (urls) => {
    const filesData = [];
    
    if (urls) {
        for (const url of urls) {
            try {
                console.log("DOWNLOADING: ", url.path);
                const response = await axios.get(url.path, {
                    responseType: 'arraybuffer',
                });
                console.log('MINIO RESPONSE: ', response);
                filesData.push({
                    file: response.data,
                    name: url.path.split("/").pop(),
                });
            } catch (error) {
                console.error("Error while downloading files from minio: ", error);
            }
        }
        console.log("All files downloaded successfully!");
    }

    return filesData;
};

module.exports = {
    downloadFilesFromBucket,
};
