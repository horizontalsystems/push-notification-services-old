import IdentityService from '../services/identity.service';

class AuthorizationMiddleware {
    static authenticateToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }

        return IdentityService.verifyJWT(token)
            .then(() => {
                next();
            })
            .catch(() => res.status(401).json({ error: 'Not Authorized' }))
    }
}

export default AuthorizationMiddleware;
