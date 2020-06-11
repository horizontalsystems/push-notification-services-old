import { Router } from 'express'
import required from './api/push.notif.routes'

const router = new Router()
router.use('/api/v1', required);

export default router
