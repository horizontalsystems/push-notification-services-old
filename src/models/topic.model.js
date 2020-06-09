import Sequelize from 'sequelize';

class Topic extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: DataTypes.STRING
            },
            {
                tableName: 'tb_topic',
                sequelize
            }
        );
    }
}

export default Topic;
