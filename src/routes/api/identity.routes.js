import express from 'express';
import IdentityController from '../../controllers/identity.controller';
import logger from '../../utils/logger.winston';

const router = express.Router();
const identityController = new IdentityController(logger);

// identity
router.get('/authenticate', (req, res) => {
    identityController.authenticate(req, res)
});

export default router
