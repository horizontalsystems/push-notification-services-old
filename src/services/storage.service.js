import Channel from '../models/channel.model';
import Device from '../models/device.model';
import User from '../models/user.model';

class StorageService {
    static getUserByUsername(username) {
        return User.findOne({
            where: { username },
            order: [['name', 'DESC']]
        });
    }

    static getChannelByName(name) {
        return Channel.findOne({
            where: { name },
            order: [['name', 'DESC']]
        });
    }

    static getChannels(channelNames) {
        return Channel.findAll({
            where: {
                name: channelNames
            },
            order: [['name', 'DESC']]
        });
    }

    static getSubscribedDevices(channelName) {
        return Channel.findOne({
            include: [{
                model: Device,
                as: 'devices',
                required: false,
                attributes: ['id', 'token'],
                through: { attributes: [] }
            }],
            where: { name: channelName }
        })
    }

    static getDeviceChannels(token) {
        return Device.findOne({
            include: [{
                model: Channel,
                as: 'channels',
                required: false,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }],
            where: { token }
        })
    }

    static getSubscribedDevicesByType(channelName, deviceType) {
        return Channel.findOne({
            include: [{
                model: Device,
                as: 'devices',
                required: false,
                attributes: ['id', 'token', 'type'],
                through: { attributes: [] },
                where: { type: deviceType }
            }],
            where: { name: channelName }
        })
    }

    static saveChannel(newChannel) {
        return Channel.findOrCreate({
            where: {
                name: newChannel.name
            },
            defaults: {
                name: newChannel.name
            }
        }).then(created => created[0]);
    }

    static saveDevice(token, bundleId) {
        return Channel.findOrCreate({
            where: {
                token
            },
            defaults: {
                token,
                bundleId
            }
        }).then(created => created[0]);
    }

    static saveChannels(channels) {
        return Channel.bulkCreate(channels, {
            updateOnDuplicate: ['name']
        })
    }

    static addDeviceToChannel(token, bundleId, channel) {
        return Device.findOrCreate({
            where: {
                token
            },
            defaults: {
                token,
                bundleId
            }
        }).then(created => {
            if (created[0]) {
                channel.addDevices(created[0])
            }
        });
    }

    static addDeviceToChannels(token, bundleId, channels) {
        return Device.findOrCreate({
            where: {
                token
            },
            defaults: {
                token,
                bundleId
            }
        }).then(created => {
            if (created[0]) {
                created[0].addChannels(channels)
            }
        });
    }

    static removeDeviceFromChannel(token, channel) {
        return Device.findOne({
            where: {
                token
            }
        }).then(found => {
            if (found) {
                found.removeChannel(channel)
            }
        });
    }

    static removeDeviceFromChannels(token, channels) {
        return Device.findOne({
            where: {
                token
            }
        }).then(found => {
            if (found) {
                found.removeChannels(channels)
            }
        });
    }

    static removeDevice(token) {
        return Device.destroy({
            where: {
                token
            }
        });
    }

    static removeChannel(channelName) {
        return Channel.destroy({
            where: {
                name: channelName
            }
        });
    }
}

export default StorageService;
