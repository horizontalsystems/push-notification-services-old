import FirebaseMessagingProvider from './provider/firebase.messaging.provider';
import ApnsProvider from './provider/apns.provider';
import DeviceType from '../models/device.type'
import Utils from '../utils/utils'
import appConfig from '../../config/pns.config.json';
import StorageService from './storage.service'
import Channel from '../models/channel.model';

const config = appConfig[process.env.NODE_ENV || 'development'];

class PushNotificationService {
    constructor(logger) {
        this.logger = logger
        this.firebaseMessagingProvider = new FirebaseMessagingProvider(config, logger);
        this.apnsProvider = new ApnsProvider(config, logger);
    }

    send(token, notifTitle, notifBody, data) {
        if (Utils.detectDeviceType(token) === DeviceType.ANDROID) {
            return this.firebaseMessagingProvider.send(token, notifTitle, notifBody, data);
        }

        return this.apnsProvider.send(token, notifTitle, notifBody, data);
    }

    sendToChannel(channelName, notifTitle, notifBody, data) {
        StorageService.getSubscribedDevices(channelName).then(channel => {
            if (!channel && !channel.devices) {
                this.apnsProvider.send(channel.devices, notifTitle, notifBody, data)
            }
        })

        return this.firebaseMessagingProvider.sendToChannel(channelName, notifTitle, notifBody, data)
    }

    subscribeToChannel(token, channelName) {
        if (Utils.detectDeviceType(token) === DeviceType.IOS) {
            const channel = {
                name: channelName,
                devicesToken: token
            }
            // channel.devices.push(new Device())
            console.log(JSON.stringify(channel))
            StorageService.saveChannel(channel)
        } else {
            this.firebaseMessagingProvider.subscribeToChannel(token, channelName);
        }

        return Promise.resolve()
    }

    unsubscribeFromchannel(token, channelName) {
        return this.firebaseMessagingProvider.unSubscribeFromChannel(token, channelName);
    }
}

export default PushNotificationService;
