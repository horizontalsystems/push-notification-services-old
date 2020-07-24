/* eslint-disable max-len */
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
                this.logger.info(`Sending message to APN tokens:${tokens}`)

                this.apnsProvider.sendDataMessage(tokens, data)
            }

            this.logger.info(`Sending message to Firebase Channel:${channelName}`)
            const response = await this.firebaseMessagingProvider.sendToChannel(channelName, notifTitle, notifBody, data)
            this.logger.info(`Firebase Response:${JSON.stringify(response)}`)
        } catch (e) {
            this.logger.info(e)
        }
    }

    async sendDataToChannel(channelName, data) {
        try {
            const channel = await StorageService.getSubscribedDevicesByType(channelName, DeviceType.IOS)
            if (channel && channel.devices) {
                const tokens = channel.devices.map(device => device.token);
                this.logger.info(`Sending message to APN tokens:${tokens}`)

                const res = await this.apnsProvider.sendDataMessage(tokens, data)
                this.logger.info(`APNS Response:${JSON.stringify(res)}`)
            }

            this.logger.info(`Sending message to Firebase Channel:${channelName}`)
            const resposen = await this.firebaseMessagingProvider.sendDataMessageToChannel(channelName, data)
            this.logger.info(`Firebase Response:${JSON.stringify(resposen)}`)
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

    async subscribeToChannels(token, channelNames) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.IOS) {
                const channels = channelNames.map(channelName => ({ name: channelName }))
                const savedChannels = await StorageService.saveChannels(channels)

                StorageService.addDeviceToChannels(token, savedChannels)
            } else {
                channelNames.forEach(name => {
                    this.firebaseMessagingProvider.subscribeToChannel(token, name);
                })
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async unSubscribeFromChannel(token, channelName) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.IOS) {
                const device = await StorageService.getDeviceChannels(token)

                if (device && device.channels) {
                    const intersection = device.channels.filter(
                        channel => channel.name === channelName
                    );

                    if (intersection) {
                        if (device.channels.length === 1) {
                            StorageService.removeDevice(token)
                        } else {
                            StorageService.removeDeviceFromChannel(token, intersection[0])
                        }
                    }
                }
            } else {
                this.firebaseMessagingProvider.unSubscribeFromChanneloChannel(token, channelName);
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async unSubscribeFromChannels(token, channelNames) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.IOS) {
                const device = await StorageService.getDeviceChannels(token)

                if (device && device.channels) {
                    const intersection = device.channels.filter(
                        channel => channelNames.some(name => channel.name === name)
                    );

                    if (intersection.length === device.channels.length) {
                        StorageService.removeDevice(token)
                    } else {
                        StorageService.removeDeviceFromChannels(token, intersection)
                    }
                }
            } else {
                channelNames.forEach(name => {
                    this.firebaseMessagingProvider.unSubscribeFromChanneloChannel(token, name);
                })
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async unSubscribeFromAllChannels(token) {
        try {
            if (Utils.detectDeviceType(token) === DeviceType.IOS) {
                StorageService.removeDevice(token)
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async getChannels(token) {
        try {
            const device = await StorageService.getDeviceChannels(token)
            if (device.channels) {
                const channelNames = device.channels.map(channel => channel.name)
                return channelNames
            }
        } catch (e) {
            this.logger.info(e)
        }

        return []
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
