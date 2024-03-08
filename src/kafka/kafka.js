const { Kafka, logLevel } = require('kafkajs');

require('dotenv').config();

const kafka = new Kafka({
    // вроде необязательно
    // clientId: 'my-app',
    logLevel: logLevel.INGO,
    brokers: [process.env.MARS_KAFKA_CONSUMER]
});

module.exports = {
    kafka,
};
