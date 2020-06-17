import { Router } from 'express'
import messagingRoutes from './api/messaging.routes'
import identityRoutes from './api/identity.routes'
import IdentityController from '../controllers/identity.controller'

const router = new Router()
router.use('/api/v1/messaging', IdentityController.isAuthenticated, messagingRoutes);
router.use('/api/v1/identity', identityRoutes);

export default router
