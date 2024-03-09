const calculateDeltaTime = (from, to) =>
    Math.abs(new Date(from) - new Date(to)) / 1000;

const calculateAllowedSize = (from, to, speed) =>
    calculateDeltaTime(from, to) * Number(speed);

const calculateFileSize = (stringifiedMessage) => {
    const { id, title, owner, createdAt, payload, files } = JSON.parse(stringifiedMessage);

    const filesSize = files.reduce((acc, file) => acc + file.length, 0);

    const payloadObject = { id, title, owner, createdAt, payload };
    const payloadSize = JSON.stringify(payloadObject).length;

    return filesSize * 8 + payloadSize * 8;
}

const formatTimeToTimestamp = (date, commonTimezone = 'UTC') => {
    let timestamp = date.getTime();

    let offset = date.getTimezoneOffset();

    let commonOffset = (new Date(commonTimezone)).getTimezoneOffset();
    timestamp -= (offset - commonOffset) * 60 * 1000;

    return timestamp;
}

module.exports = {
    calculateAllowedSize,
    calculateFileSize,
    formatTimeToTimestamp,
};
