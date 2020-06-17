import express from 'express';
import MesssagingController from '../../controllers/messaging.controller';
import logger from '../../utils/logger.winston';

const router = express.Router();
const messsagingController = new MesssagingController(logger);

// Messaging
router.post('/send/data/:topic', (req, res) => {
    messsagingController.send(req, res)
});

router.post('/send/data', (req, res) => {
    messsagingController.sendToTopic(req, res);
});

router.post('/send/notification/:topic', (req, res) => {
    messsagingController.sendNotificationToTopic(req, res);
});

router.post('/send/notification', (req, res) => {
    messsagingController.sendNotification(req, res);
});

router.post('/subscribe/:topic', (req, res) => {
    messsagingController.sendToTopic(req, res)
});

router.post('/unsubscribe/:topic', (req, res) => {
    messsagingController.sendToTopic(req, res)
});

export default router
