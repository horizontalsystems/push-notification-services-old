import { Router } from 'express'
import pushNotificationRoutes from './api/push.notif.routes'
import identityRoutes from './api/identity.routes'
import AuthorizationMiddleware from '../middlewares/auth.middleware'

const router = new Router()
router.use('/api/v1/pns', AuthorizationMiddleware.authenticateToken, pushNotificationRoutes);
router.use('/api/v1/identity', identityRoutes);

export default router
