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

    return router
})

// User routes
const userPnsRoutes = (router => {
    router.post('/subscribe/:channel', (req, res) => {
        pushNotificationController.subscribeToChannel(req, res);
    });

    router.post('/unsubscribe/:channel', (req, res) => {
        pushNotificationController.unSubscribeFromChannel(req, res);
    });

    return router
});

const psnRoutes = {
    adminPnsRoutes,
    userPnsRoutes
}

export default psnRoutes
