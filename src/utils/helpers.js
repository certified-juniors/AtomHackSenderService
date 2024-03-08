const calculateDeltaTime = (from, to) => 
    Math.abs(new Date(from) - new Date(to))/1000;

const calculateAllowedSize = (from, to, speed) => 
    calculateDeltaTime(from, to) * Number(speed);

module.exports = {
    calculateAllowedSize,
};