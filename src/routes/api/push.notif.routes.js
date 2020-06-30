import express from 'express';
import PushNotificationController from '../../controllers/push.notif.controller';
import logger from '../../utils/logger.winston';

const router = express.Router();
const pushNotificationController = new PushNotificationController(logger);

// Messaging

router.post('/send', (req, res) => {
    pushNotificationController.send(req, res);
});

router.post('/send/:channel', (req, res) => {
    pushNotificationController.sendToChannel(req, res)
});

router.post('/subscribe/:channel', (req, res) => {
    pushNotificationController.subscribeToChannel(req, res)
});

router.post('/unsubscribe/:channel', (req, res) => {
    pushNotificationController.unSubscribeFromChannel(req, res)
});

export default router
