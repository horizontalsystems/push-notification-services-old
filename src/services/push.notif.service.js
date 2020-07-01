import FirebaseMessagingProvider from './provider/firebase.messaging.provider';
import ApnsProvider from './provider/apns.provider';
import DeviceType from '../models/device.type'
import Utils from '../utils/utils'
import appConfig from '../../config/pns.config.json';
import StorageService from './storage.service'

const config = appConfig[process.env.NODE_ENV || 'development'];

class PushNotificationService {
    constructor(logger) {
        this.logger = logger
        this.firebaseMessagingProvider = new FirebaseMessagingProvider(config, logger);
        this.apnsProvider = new ApnsProvider(config, logger);
    }

    async send(token, notifTitle, notifBody, data) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.ANDROID) {
                this.firebaseMessagingProvider.send(token, notifTitle, notifBody, data);
            } else {
                this.apnsProvider.send(token, notifTitle, notifBody, data);
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async sendToChannel(channelName, notifTitle, notifBody, data) {
        try {
            const channel = await StorageService.getSubscribedDevicesByType(channelName, DeviceType.IOS)
            if (channel && channel.devices) {
                const tokens = channel.devices.map(device => device.token);
                this.apnsProvider.send(tokens, notifTitle, notifBody, data)
            }

            this.firebaseMessagingProvider.sendToChannel(channelName, notifTitle, notifBody, data)
        } catch (e) {
            this.logger.info(e)
        }
    }

    async subscribeToChannel(token, channelName) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.IOS) {
                const channel = {
                    name: channelName
                }
                const createdChannel = await StorageService.saveChannel(channel)

                if (createdChannel) {
                    StorageService.addDeviceToChannel(token, createdChannel)
                }
            } else {
                this.firebaseMessagingProvider.subscribeToChannel(token, channelName);
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async unSubscribeFromChannel(token, channelName) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.IOS) {
                const foundChannel = await StorageService.getSubscribedDevices(channelName)

                if (foundChannel) {
                    StorageService.removeDeviceFromChannel(token, foundChannel)
                }
            } else {
                this.firebaseMessagingProvider.subscribeTunSubscribeFromChanneloChannel(token, channelName);
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async removeDevice(token) {
        try {
            StorageService.removeDevice(token)
        } catch (e) {
            this.logger.info(e)
        }
    }

    async removeChannel(channelName) {
        try {
            StorageService.removeChannel(channelName)
        } catch (e) {
            this.logger.info(e)
        }
    }
}

export default PushNotificationService;
