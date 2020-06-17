/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import appConfig from '../../config/app.config.json';

const config = appConfig[process.env.NODE_ENV || 'development'];

class IdentityService {
    constructor(logger) {
        this.logger = logger;
        this.users = config.users;
    }

    static async verifyJWT(token) {
        try {
            const { options } = config.jwt;
            return jwt.verify(token, config.jwt.secret, options);
        } catch (err) {
            throw new Error(err);
        }
    }

    async authenticate(username, password) {
        const result = {};
        const user = this.getUserByUsername(username);

        if (user && user.password === password) {
            const payload = { user: user.name };
            const { options } = config.jwt;
            const token = jwt.sign(payload, config.jwt.secret, options);

            result.token = token;
            result.status = 200;
        } else {
            result.status = 401;
            result.error = 'Authentication error';
        }

        return result;
    }

    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    async getUsers() {
        return this.users.map(u => this.omitPassword(u));
    }

    omitPassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

export default IdentityService;
