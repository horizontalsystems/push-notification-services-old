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

    static addDeviceToChannel(token, channel) {
        return Device.findOrCreate({
            where: {
                token
            },
            defaults: {
                token
            }
        }).then(created => {
            if (created[0]) {
                channel.addDevices(created[0])
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
                channel.removeDevices(found)
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
