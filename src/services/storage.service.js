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
        return this.Channel.findOne({
            where: { name: channelName },
            order: [['name', 'DESC']],
            include: [
                {
                    model: Device,
                    as: 'devices',
                    required: false,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });
    }

    static saveChannel(newChannel) {
        return Channel.findOrCreate({
            where: {
                name: newChannel.name
            },
            defaults: {
                name: newChannel.name
            }
        }).then(created => {
            console.log(JSON.stringify(created[0]));
        });
    }
}

export default StorageService;
