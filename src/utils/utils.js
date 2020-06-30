import DeviceType from '../models/device.type'

class Utils {
    static detectDeviceType(token) {
        if (token.length === 64) {
            return DeviceType.IOS
        }
        if (token.length === 163) {
            return DeviceType.ANDROID
        }

        return DeviceType.WEB
    }
}

export default Utils
