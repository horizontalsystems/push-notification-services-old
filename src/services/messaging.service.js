import FirebaseMessagingProvider from './provider/firebase.messaging.provider';

class MessagingService {
    constructor(logger) {
        this.logger = logger
        this.firebaseMessagingProvider = new FirebaseMessagingProvider(logger);
    }

    send(token, data) {
        return this.firebaseMessagingProvider.send(token, data);
    }

    sendNotification(token, title, body) {
        return this.firebaseMessagingProvider.sendNotification(token, title, body);
    }

    sendToAll(tokens, data) {
        return this.firebaseMessagingProvider.sendToAll(tokens, data);
    }

    sendToTopic(topic, data) {
        return this.firebaseMessagingProvider.sendToTopic(topic, data)
    }

    sendNotificationToTopic(topic, title, body) {
        return this.firebaseMessagingProvider.sendNotificationToTopic(topic, title, body)
    }

    subscriteToTopic(tokens, topic) {
        return this.firebaseMessagingProvider.subscriteToTopic(tokens, topic);
    }

    unsubscribeFromTopic(tokens, topic) {
        return this.firebaseMessagingProvider.subscriteToTopic(tokens, topic);
    }
}

export default MessagingService;
