# Horizontals Systems Push notification Services

Push notification services (Node.JS)

## Installation with Docker

```bash
$ git clone https://github.com/horizontalsystems/push-notification-services
$ cd push-notification-services
```

Update configuration files based on Production **config** folder
1. app.config.json
2. config.json (database)
3. pns.config.json (Apns and Firebase settings)

```bash  
$ docker-compose up -d
```

## Installation

1. Clone repo and install notification server :

```bash
$ git clone https://github.com/horizontalsystems/push-notification-services
$ cd push-notification-services
$ npm install
```
2. Install PostgreSQL database
    a. Create database with name "pns"
    b. Set username and password (postgres/postgres)

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
1. Get JWT token (authenticate) :GET  ``/api/v1/identity/authenticate``

>Query params:

```js

    username = "username"  // User name
    password = "psw" // Title of notification message
 
```

 > curl example :
```bash
curl "http://localhost:5000/api/v1/identity/authenticate?username=admin&password=secret"
```


2. Send message to device :POST  ``/api/v1/admin/send``

>Input params (Add Bearer authorization token):

```js
{
    "token":"client_token", // Client token
    "title":"Title",  // Title of notification message
    "body":"Body" // Body of notification message
} 
```

 > curl example :
```bash
curl -H "Content-Type: application/json" --data '{"token":"client_token","title":"Title","body":"Body"}' http://localhost:5000/api/v1/admin/send/
```

3. Send message to Topic :POST  ``/api/v1/admin/send/:TOPIC_NAME``

> Input params (Add Bearer authorization token):

```js
{
    "token":"client_token", // Client token
    "title":"Title",  // Title of notification message
    "body":"Body" // Body of notification message
} 
```

>curl example :
```bash
curl -H "Content-Type: application/json" --data '{"title":"Title","body":"Body"}' http://localhost:5000/api/v1/admin/send/PRICE_CHANGE
```

4. Subscribe device to Topic :POST  ``/api/v1/pns/subscribe/:TOPIC_NAME``

> Input params (Add Bearer authorization token):

```js
{ 
    "token":"token"
} 
```

>curl example :
```bash
curl -H "Content-Type: application/json" --data '{"token":"token"}' http://localhost:5000/api/v1/pns/subscribe/PRICE_CHANGE
```

5. UnSubscribe device from Topic :POST  ``/api/v1/pns/unsubscribe/:TOPIC_NAME``

> Input params (Add Bearer authorization token):

```js
{
    "token":"token"
} 
```

>curl example :
```bash
curl -H "Content-Type: application/json" --data '{"token":"token"}' http://localhost:5000/api/v1/pns/unsubscribe/PRICE_CHANGE
```
