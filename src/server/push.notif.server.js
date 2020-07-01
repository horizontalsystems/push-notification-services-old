import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes'
import logger from '../utils/logger.winston'
import db from '../models/index'

const morgan = require('morgan');

class PushNotificationServer {
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.sequelize = db.sequelize
        this.port = process.env.PORT || '5000'

        const corsOptions = {
            origin: `http://localhost:${this.port}`
        };

        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.get('/', (_, res) => {
            res.send('Push notification server is On !!!');
        });

        this.initMiddlewares();
        this.initRoutes();
        this.initDb()
    }

    initRoutes() {
        this.app.use(routes);
    }

    initMiddlewares() {
        this.app.use(morgan('combined', { stream: logger.stream }));
    }

    initDb() {
        this.sequelize.sync({ force: false })
    }

    listen() {
        this.http.listen(this.port);
        logger.info(`App started listening port:${this.port}`)
    }
}

export default PushNotificationServer;
