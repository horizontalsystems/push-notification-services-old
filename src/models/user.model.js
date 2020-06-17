import Sequelize from 'sequelize';

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                username: { type: DataTypes.STRING, allowNull: false, unique: true },
                password: { type: DataTypes.STRING, unique: false },
                created: { type: DataTypes.DATE, defaultValue: Sequelize.literal('NOW()') }
            },
            {
                timestamps: false,
                tableName: 'tb_user',
                sequelize
            }
        );
    }

    static getById(where) {
        return this.findOne({
            where,
            attributes: ['id'],
            order: [['username', 'DESC']]
        });
    }

    static getByUsername(where) {
        return this.findOne({
            where,
            attributes: ['username'],
            order: [['username', 'DESC']]
        });
    }

    static getAll() {
        return this.findAll()
    }
}

export default User;
