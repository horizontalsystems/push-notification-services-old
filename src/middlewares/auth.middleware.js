import IdentityService from '../services/identity.service';

class AuthorizationMiddleware {
    static verifyJWT(req) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            throw new Error('Unauhtorized');
        }

        return IdentityService.verifyJWT(token)
    }

    static async authenticateToken(req, res, next) {
        try {
            await AuthorizationMiddleware.verifyJWT(req)
            next();
        } catch (e) {
            res.status(401).json({ error: 'Not Authorized' })
        }
    }

    static async authorizeAdmin(req, res, next) {
        try {
            const result = await AuthorizationMiddleware.verifyJWT(req)
            if (result.role === 'admin') {
                next();
            } else {
                res.status(401).json({ error: 'Not Authorized' })
            }
        } catch (e) {
            res.status(401).json({ error: 'Not Authorized' })
        }
    }
}

export default AuthorizationMiddleware;
