const { kafka } = require('./kafka');
const { Message } = require('../message');
const { periods } = require('../period');

let consumer;

const runNewConsumer = async () => {
    consumer = kafka.consumer({ groupId: Date.now().toString() });

    await consumer.connect();
    await consumer.subscribe({ topic: process.env.MARS_KAFKA_TOPIC, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const msg = new Message(message.value.toString());
            msg.handle();
        },
    });
};

module.exports = {
    runNewConsumer,
};