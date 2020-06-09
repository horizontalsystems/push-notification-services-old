
import PushNotificationService from '../services/push.notif.service';

class PushNotificationController {
    constructor(logger) {
        this.logger = logger;
        this.pushNotificationService = new PushNotificationService(logger);
    }

    send(req, res) {
        this.pushNotificationService
            .send(req.body.token, req.body.data)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    sendToTopic(req, res) {
        this.pushNotificationService
            .sendToTopic(req.params.topic, req.body)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    sendNotification(req, res) {
        this.pushNotificationService
            .sendNotification(
                req.body.token,
                req.body.title,
                req.body.body
            )
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    sendNotificationToTopic(req, res) {
        this.pushNotificationService
            .sendNotificationToTopic(
                req.params.topic,
                req.body.title,
                req.body.body
            )
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    subscribeToTopic(req, res) {
        this.pushNotificationService
            .subscriteToTopic(req.body.tokens, req.params.topic)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    unSubscribeFromTopic(req, res) {
        this.pushNotificationService.un
            .unSubscribeFromTopic(req.body.tokens, req.params.topic)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
}

export default PushNotificationController;
