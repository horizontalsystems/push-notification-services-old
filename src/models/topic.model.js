import Sequelize from 'sequelize';

class Topic extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: { type: DataTypes.STRING, allowNull: false, unique: true }
            },
            {
                timestamps: false,
                tableName: 'tb_topic',
                sequelize
            }
        );
    }

    static getById(where) {
        return this.findOne({
            where,
            attributes: ['id'],
            order: [['name', 'DESC']]
        });
    }

    static getByName(where) {
        return this.findOne({
            where,
            attributes: ['name'],
            order: [['name', 'DESC']]
        });
    }
}

export default Topic;
