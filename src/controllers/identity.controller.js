
import IdentityService from '../services/identity.service';

class IdentityController {
    constructor(logger) {
        this.logger = logger;
        this.identityService = new IdentityService(logger);
    }

    static isAuthenticated(req, res, next) {
        if (typeof req.headers.authorization !== 'undefined') {
            const token = req.headers.authorization.split(' ')[1];
            IdentityService.verifyJWT(token)
                .then(result => {
                    req.decoded = result;
                    next()
                })
                .catch(res.status(401).json({ error: 'Not Authorized' }));
        } else {
            res.status(401).json({ error: 'Not Authorized' });
        }
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
