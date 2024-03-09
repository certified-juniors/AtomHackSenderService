const { calculateAllowedSize, formatTimeToTimestamp } = require("./utils/helpers");

let periods = [];
let unhandledMessages = [];

function clearPeriods() {
    for (let period of periods) {
        unhandledMessages.unshift(...period.messages);
    }

    periods.splice(0, periods.length);
};

function distributeUnhandledMessages() {
    let previousLength = unhandledMessages.length;
    while (unhandledMessages.length > 0) {
        let message = unhandledMessages.shift();
        if (message) {
            message.handle();
        } else {
            return;
        }
    }
    if (previousLength !== unhandledMessages.length) {
        distributeUnhandledMessages();
    }
}

class Period {
    constructor(start_time, end_time, speed) {
        const size = calculateAllowedSize(start_time, end_time, speed);
        this.start_time = start_time;
        this.end_time = end_time;
        this.speed = speed;
        // Мегабиты
        this.size = size;
        this.messages = [];
        this.capacity = size;
        this.busy = false;
        this.timers = (() => {
            if (this.isPassed()) {
                return;
            }
            return setTimeout(async () => {
                this.busy = true;
                console.log("Period from", this.start_time, "to", this.end_time, "is started");
                await this.sendMessages(); //
                this.busy = false;
            },  new Date(this.end_time) - new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Moscow'})));
        })();
    }

    isPassed() {
        return new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Moscow'})) > new Date(this.end_time);
    }

    isStarted() {
        console.log("Current Time", new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Moscow'})));
        console.log("start time", new Date(this.start_time))
        
        return new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Moscow'})) >= new Date(this.start_time);
    }

    async addMessage(message) {
        this.messages.push(message);
        this.capacity -= message.size;
        console.log(!this.busy, !this.isPassed(), this.isStarted());
        if (!this.busy && !this.isPassed() && this.isStarted()) {
            console.log("Adding message to free active period", this.start_time, "to", this.end_time);
            await this.sendMessages();
        }
    }

    async sendMessages() {
        if (this.messages.length === 0) {
            this.busy = false;
            return;
        }
        this.busy = true;
        await this.messages.pop().send();
        await this.sendMessages()
    }
}

module.exports = {
    Period,
    clearPeriods,
    periods,
    unhandledMessages,
    distributeUnhandledMessages
}