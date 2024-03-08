class Message {
    constructor(id, title, owner, receivedTime, sentTime, createdAt, deliveryStatus, status, payload, files) {
        this.id = id;
        this.title = title;
        this.owner = owner;
        this.receivedTime = receivedTime;
        this.sentTime = sentTime;
        this.createdAt = createdAt;
        this.deliveryStatus = deliveryStatus;
        this.status = status;
        this.payload = payload;
        this.files = files;
    }
}

class MessagePayload {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
}