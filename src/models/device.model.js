import Sequelize from 'sequelize';

class Device extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                type: { type: DataTypes.INTEGER, defaultValue: 1 }
            },
            {
                timestamps: false,
                tableName: 'tb_device',
                sequelize
            }
        );
    }

    static associate(models) {
        Device.belongsToMany(models.Channel, {
            through: 'tb_channel_device',
            as: 'channels',
            foreignKey: 'device_id',
            otherKey: 'channel_id'
        });
    }
}

export default Device;
