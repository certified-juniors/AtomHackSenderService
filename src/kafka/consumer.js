const Schedule = require('../schedule');
const { kafka } = require('./kafka');

let consumer;

const runNewConsumer = async (schedule) => {
    consumer = kafka.consumer({ groupId: schedule.creationTime.toISOString() });

    await consumer.connect();
    await consumer.subscribe({ topic: process.env.MARS_KAFKA_TOPIC, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
        },
    });
}

module.exports = {
    runNewConsumer,
};