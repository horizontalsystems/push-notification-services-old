import Sequelize from 'sequelize';
import Device from './device.model';
import Channel from './channel.model';
import User from './user.model';
import dbConfig from '../../config/config.json';

const config = dbConfig[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const models = {
    User: User.init(sequelize, Sequelize),
    Channel: Channel.init(sequelize, Sequelize),
    Device: Device.init(sequelize, Sequelize)
};

// This creates relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

export default db
