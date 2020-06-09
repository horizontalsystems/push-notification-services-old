# Horizontals Systems Push notification Services

Push notification services (Node.JS)

## Installation

1. Clone repo and install notification server :

```bash
$ git clone https://github.com/horizontalsystems/push-notification-services
$ cd push-notification-services
$ npm install
```

2. Set/Update Firebase config file with Firebase project settings:

```
./config/fcm.config.json
```

3. Install client demo app (Android APK) from :

```
./client/pnstest.apk
```

## Starting

1. Run start script with command:

```bash
$ node -r esm bin/app.js
```

Application will start express server on  http://localhost:5000/

2. Start android demo application and subscribe to Topic (`PRICE_CHANGE`). (Topic  name hardcoded as PRICE_CHANGE)


## API 

1. Send message to device :POST  ``/api/v1/pns/send/notification``

>Input params:

```js
{"token":"client_token", // Client token
 "title":"Title",  // Title of notification message
 "body":"Body" } // Body of notification message
```

 > curl example :
```bash
curl -H "Content-Type: application/json" --data '{"token":"client_token","title":"Title","body":"Body"}' http://localhost:5000/api/v1/pns/send/notification
```

2. Send message to Topic :POST  ``/api/v1/pns/send/notification/:TOPIC_NAME``

> Input params:

```js
{"token":"client_token", // Client token
 "title":"Title",  // Title of notification message
 "body":"Body" } // Body of notification message
```

>curl example :
```bash
curl -H "Content-Type: application/json" --data '{"title":"Title","body":"Body"}' http://localhost:5000/api/v1/pns/send/notification/PRICE_CHANGE
```

3. Subscribe device to Topic :POST  ``/api/v1/pns/subscribe/:TOPIC_NAME``

> Input params:

```js
{"tokens":"tokens"} // Comma separeted tokens
```

>curl example :
```bash
curl -H "Content-Type: application/json" --data '{"tokens":"tokens"}' http://localhost:5000/api/v1/pns/subscribe/PRICE_CHANGE
```

4. UnSubscribe device from Topic :POST  ``/api/v1/pns/unsubscribe/:TOPIC_NAME``

> Input params:

```js
{"tokens":"tokens"} // Comma separeted tokens
```

>curl example :
```bash
curl -H "Content-Type: application/json" --data '{"tokens":"tokens"}' http://localhost:5000/api/v1/pns/unsubscribe/PRICE_CHANGE
```
