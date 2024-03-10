const calculateDeltaTime = (from, to) =>
    Math.abs(new Date(from) - new Date(to)) / 1000;

const calculateAllowedSize = (from, to, speed) =>
    calculateDeltaTime(from, to) * Number(speed);

const calculateFileSize = (stringifiedMessage) => {
    const { id, title, owner, createdAt, payload, files } = JSON.parse(stringifiedMessage);

    const filesSize = files.reduce((total, file) => total + file.size, 0) || 0;

    const payloadObject = {
        id: id,
        title: title,
        owner: owner,
        createdAt: createdAt,
        payload: payload,
    };

    const payloadSize = JSON.stringify({payloadObject}).length || 0;

    return filesSize * 8 + payloadSize * 8;
}

module.exports = {
    calculateAllowedSize,
    calculateFileSize,
};
