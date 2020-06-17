/* eslint-disable class-methods-use-this */

import firebaseAdmin from 'firebase-admin';

const serviceAccount = require('../../../config/fcm.config.json');

class FirebaseMessagingProvider {
    constructor(logger) {
        this.logger = logger
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: 'https://hs-pns.firebaseio.com'
        });
    }

    sendToAll(tokens, data) {
        const message = {
            data,
            tokens
        };

        firebaseAdmin.messaging().sendMulticast(message);
    }

    sendNotification(tokens, title, body) {
        const payload = {
            notification: {
                title,
                body
            }
        };

        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24 // 1 day
        };

        return firebaseAdmin.messaging().sendToDevice(tokens, payload, options);
    }

    send(token, data) {
        const payload = {
            data,
            token
        };

        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24 // 1 day
        };

        return firebaseAdmin.messaging().send(payload, options);
    }

    sendToTopic(topic, data) {
        const payload = {
            data
        };

        return firebaseAdmin.messaging().sendToTopic(topic, payload)
    }

    sendNotificationToTopic(topic, title, body) {
        const payload = {
            notification: {
                title,
                body
            }
        };

        return firebaseAdmin.messaging().sendToTopic(topic, payload)
    }

    subscribeToTopic(tokens, topic) {
        return firebaseAdmin.messaging().subscribeToTopic(tokens, topic);
    }

    unSubscribeFromTopic(tokens, topic) {
        return firebaseAdmin.messaging().unsubscribeFromTopic(tokens, topic);
    }
}

export default FirebaseMessagingProvider;
