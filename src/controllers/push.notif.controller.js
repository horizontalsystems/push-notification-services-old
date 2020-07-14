
import PushNotificationService from '../services/push.notif.service';

class PushNotificationController {
    constructor(logger) {
        this.logger = logger;
        this.pushNotificationService = new PushNotificationService(logger);
    }

    send(req, res) {
        this.pushNotificationService
            .send(
                req.body.token,
                req.body.title,
                req.body.body,
                req.body.data
            )
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    sendToChannel(req, res) {
        this.pushNotificationService
            .sendToChannel(
                req.params.channel,
                req.body.title,
                req.body.body,
                req.body.data
            )
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    sendDataToChannel(req, res) {
        this.pushNotificationService
            .sendDataToChannel(
                req.params.channel,
                req.body
            )
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }


    subscribeToChannel(req, res) {
        this.pushNotificationService
            .subscribeToChannel(req.body.token, req.params.channel)
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    subscribeToChannels(req, res) {
        this.pushNotificationService
            .subscribeToChannels(req.body.token, req.body.channels || req.body.topics)
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    unSubscribeFromChannel(req, res) {
        this.pushNotificationService
            .unSubscribeFromChannel(req.body.token, req.params.channel)
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    unSubscribeFromChannels(req, res) {
        this.pushNotificationService
            .unSubscribeFromChannels(req.body.token, req.body.channels || req.body.topics)
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    removeDevice(req, res) {
        this.pushNotificationService
            .removeDevice(req.params.token)
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    removeChannel(req, res) {
        this.pushNotificationService
            .removeChannel(req.params.channelName)
            .then(response => {
                res.status(200).json({ success: response });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
}

export default PushNotificationController;
