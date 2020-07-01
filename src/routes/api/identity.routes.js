import IdentityController from '../../controllers/identity.controller';
import logger from '../../utils/logger.winston';

const identityController = new IdentityController(logger);

// identity
const identityRouter = (router => {
    router.get('/authenticate', (req, res) => {
        identityController.authenticate(req, res)
    });

    return router;
});

export default identityRouter
