import FirebaseMessagingHandler from './handler/firebase.messaging.handler';
// import StorageService from './storage.service';
// import models from '../models';

class PushNotificationService {
    constructor(logger) {
        this.logger = logger
        this.firebaseMessagingHandler = new FirebaseMessagingHandler(logger);
        // this.storageService = new StorageService(models);
    }

    send(token, data) {
        return this.firebaseMessagingHandler.send(token, data);
    }

    sendNotification(token, title, body) {
        return this.firebaseMessagingHandler.sendNotification(token, title, body);
    }

    sendToAll(tokens, data) {
        return this.firebaseMessagingHandler.sendToAll(tokens, data);
    }

    sendToTopic(topic, data) {
        return this.firebaseMessagingHandler.sendToTopic(topic, data)
    }

    sendNotificationToTopic(topic, title, body) {
        return this.firebaseMessagingHandler.sendNotificationToTopic(topic, title, body)
    }

    subscriteToTopic(tokens, topic) {
        return this.firebaseMessagingHandler.subscriteToTopic(tokens, topic);
    }

    unsubscribeFromTopic(tokens, topic) {
        return this.firebaseMessagingHandler.subscriteToTopic(tokens, topic);
    }
}

export default PushNotificationService;
