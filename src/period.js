const { calculateAllowedSize } = require("./utils/helpers");

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
            }, new Date(Date.UTC(this.end_time.getFullYear(), this.end_time.getMonth(), this.end_time.getDate(), this.end_time.getHours(), this.end_time.getMinutes(), this.end_time.getSeconds())) - new Date(Date.now()));
        })();
    }

    isPassed() {
        return new Date(Date.now()) > new Date(Date.UTC(this.end_time.getFullYear(), this.end_time.getMonth(), this.end_time.getDate(), this.end_time.getHours(), this.end_time.getMinutes(), this.end_time.getSeconds()));
    }

    isStarted() {
        console.log("CURRENT DATE", (new Date(Date.now())));
        const startUTC = new Date(Date.UTC(this.start_time.getFullYear(), this.start_time.getMonth(), this.start_time.getDate(), this.start_time.getHours(), this.start_time.getMinutes(), this.start_time.getSeconds()));
        return new Date(Date.now()) >= startUTC;
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