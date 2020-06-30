/* eslint-disable class-methods-use-this */
import firebaseAdmin from 'firebase-admin';

class FirebaseMessagingProvider {
    constructor(config, logger) {
        this.config = config
        this.logger = logger
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(this.config.firebase),
            databaseURL: ''
        });
    }

    sendToAll(tokens, data = { id: '1' }) {
        const message = {
            data,
            tokens
        };

        firebaseAdmin.messaging().sendMulticast(message);
    }

    send(tokens, title, body, data = { id: '1' }) {
        const payload = {
            notification: {
                title,
                body
            },
            data
        };
        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24 // 1 day
        };

        return firebaseAdmin.messaging().sendToDevice(tokens, payload, options);
    }

    sendToChannel(channel, title, body, data = { id: '1' }) {
        const payload = {
            notification: {
                title,
                body
            },
            data
        };

        return firebaseAdmin.messaging().sendToTopic(channel, payload)
    }

    subscribeToChannel(token, channel) {
        return firebaseAdmin.messaging().subscribeToTopic(token, channel);
    }

    unSubscribeFromChannel(token, channel) {
        return firebaseAdmin.messaging().unsubscribeFromTopic(token, channel);
    }
}

export default FirebaseMessagingProvider;
