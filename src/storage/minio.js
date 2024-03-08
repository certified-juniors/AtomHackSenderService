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

const downloadFilesFromBucket = (urls) => {
    const filesData = [];

    for (const url of urls) {
        const fileName = url.split('/').pop();

        minioClient.getObject(bucketName, fileName)
            .then(objectData => {
                let fileData = Buffer.from('');
                objectData.forEach(chunk => {
                    fileData = Budder.concat([fileData, chunk]);
                })

                filesData.push(fileData);
            })
            .catch(error => {
                console.error(`Error downloading file ${fileName}: `, error);
            });
    }

    return filesData;
};

module.exports = {
    downloadFilesFromBucket,
};
