
import IdentityService from '../services/identity.service';

class IdentityController {
    constructor(logger) {
        this.logger = logger;
        this.identityService = new IdentityService(logger);
    }

    authenticate(req, res) {
        this.identityService
            .authenticate(req.query.username, req.query.password)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
}

export default IdentityController;
