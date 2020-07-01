import { Router } from 'express'
// import userPnsRoutes from './api/user.pns.routes'
import pnsRoutes from './api/push.notif.routes'
import identityRoutes from './api/identity.routes'
import AuthorizationMiddleware from '../middlewares/auth.middleware'

const router = new Router()
router.use('/api/v1/pns', AuthorizationMiddleware.authenticateToken, pnsRoutes.userPnsRoutes(router));
router.use('/api/v1/admin', AuthorizationMiddleware.authorizeAdmin, pnsRoutes.adminPnsRoutes(router));
router.use('/api/v1/identity', identityRoutes(router));

export default router
