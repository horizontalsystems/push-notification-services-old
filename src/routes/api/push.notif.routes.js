/* eslint-disable implicit-arrow-linebreak */
import express from 'express';
import PushNotificationController from '../../controllers/push.notif.controller';
import logger from '../../utils/logger.winston';

const router = express.Router();
const pushNotificationController = new PushNotificationController(logger);

router.post('/pns/send/data/:topic', (req, res) => {
    pushNotificationController.send(req, res)
});

router.post('/pns/send/data', (req, res) => {
    pushNotificationController.sendToTopic(req, res);
});

router.post('/pns/send/notification/:topic', (req, res) => {
    pushNotificationController.sendNotificationToTopic(req, res);
});

router.post('/pns/send/notification', (req, res) => {
    pushNotificationController.sendNotification(req, res);
});

router.post('/pns/subscribe/:topic', (req, res) => {
    pushNotificationController.sendToTopic(req, res)
});

router.post('/pns/unsubscribe/:topic', (req, res) => {
    pushNotificationController.sendToTopic(req, res)
});

module.exports = router;
