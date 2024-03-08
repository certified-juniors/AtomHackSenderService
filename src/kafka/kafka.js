const { Kafka, logLevel } = require('kafkajs');

require('dotenv').config();

const kafka = new Kafka({
    logLevel: logLevel.INGO,
    brokers: [process.env.MARS_KAFKA_CONSUMER]
});

module.exports = {
    kafka,
};
