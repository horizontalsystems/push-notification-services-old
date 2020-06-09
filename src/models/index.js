import Sequelize from 'sequelize';
import Topic from './topic.model';
import dbConfig from '../../config/db.config.json';

const config = dbConfig[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.dialect
);

const models = {
    Topic: Topic.init(sequelize, Sequelize)
};

// This creates relationships in the ORM

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

export default {
    ...models,
    sequelize
};
