import Sequelize from 'sequelize';

class Channel extends Sequelize.Model {
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
                tableName: 'tb_channel',
                sequelize
            }
        );
    }

    static associate(models) {
        Channel.belongsToMany(models.Device, {
            through: 'tb_channel_device',
            as: 'devices',
            foreignKey: 'channel_id',
            otherKey: 'device_id'
        });
    }
}

export default Channel;
