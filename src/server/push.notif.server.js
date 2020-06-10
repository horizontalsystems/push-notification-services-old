import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes'
import logger from '../utils/logger.winston'

const morgan = require('morgan');

class PushNotificationServer {
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);

        const corsOptions = {
            origin: 'http://localhost:5000'
        };

        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.get('/', (req, res) => {
            res.send('Push notification server is On !!!');
        });

        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.app.use(routes);
    }

    initializeMiddlewares() {
        this.app.use(morgan('combined', { stream: logger.stream }));
    }

    listen(port) {
        this.http.listen(port);
        logger.info(`App started listening port:${port}`)
    }
}

export default PushNotificationServer;
