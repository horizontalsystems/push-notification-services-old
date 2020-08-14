import apn from '@parse/node-apn';

class ApnsProvider {
    constructor(config, logger) {
        this.config = config
        this.logger = logger;
        this.apnProvider = new apn.Provider(this.config.apn);
    }

    send(tokens, notifTitle, notifBody, payload, bundleId) {
        const note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 1;
        note.sound = '';
        note.alert = { title: notifTitle, body: notifBody };
        note.payload = payload;
        note.topic = (!bundleId || bundleId === 'null') ? this.config.apn.bundle_id : bundleId;

        return this.apnProvider.send(note, tokens)
    }

    sendDataMessage(tokens, data, bundleId) {
        const note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.alert = data;
        note.topic = (!bundleId || bundleId === 'null') ? this.config.apn.bundle_id : bundleId;

        return this.apnProvider.send(note, tokens)
    }
}

export default ApnsProvider;
