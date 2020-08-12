/* eslint-disable no-param-reassign */
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

    static groupBy(arrayObject, key) {
        return arrayObject.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }
}

export default Utils
