import PushNotificationController from '../../controllers/push.notif.controller';
import logger from '../../utils/logger.winston';

const pushNotificationController = new PushNotificationController(logger);

// Admin routes
const adminPnsRoutes = (router => {
    router.post('/send', (req, res) => {
        pushNotificationController.send(req, res);
    });

    router.post('/send/:channel', (req, res) => {
        pushNotificationController.sendToChannel(req, res);
    });

    router.post('/send/data/:channel', (req, res) => {
        pushNotificationController.sendDataToChannel(req, res);
    });

    return router
})

// User routes
const userPnsRoutes = (router => {
    router.post('/subscribe/:channel', (req, res) => {
        pushNotificationController.subscribeToChannel(req, res);
    });

    router.post('/subscribe', (req, res) => {
        pushNotificationController.subscribeToChannels(req, res);
    });

    router.post('/unsubscribe/:channel', (req, res) => {
        pushNotificationController.unSubscribeFromChannel(req, res);
    });

    router.get('/unsubscribeall/:token', (req, res) => {
        pushNotificationController.unSubscribeFromAllChannels(req, res);
    });

    router.post('/unsubscribe', (req, res) => {
        pushNotificationController.unSubscribeFromChannels(req, res);
    });

    router.get('/channels/:token', (req, res) => {
        pushNotificationController.getChannels(req, res);
    });

    return router
});

const psnRoutes = {
    adminPnsRoutes,
    userPnsRoutes
}

export default psnRoutes
