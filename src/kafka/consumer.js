const { kafka } = require('./kafka');
const { Message } = require('../message');
const { periods } = require('../period');
const { downloadFilesFromBucket } = require('../storage/minio');

let consumer;

const runNewConsumer = async () => {
    consumer = kafka.consumer({ groupId: Date.now().toString() });

    await consumer.connect();
    await consumer.subscribe({ topic: process.env.MARS_KAFKA_TOPIC });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Recieved new message: ", topic, partition, message.value.toString());
            const msg = new Message(message.value.toString());
            msg.files = downloadFilesFromBucket(msg.files);
            console.log('message files', msg.files);
            msg.handle();
        },
    });
};

module.exports = {
    runNewConsumer,
};