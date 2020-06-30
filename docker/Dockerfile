FROM node:12-alpine

WORKDIR /app/hspns

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .
COPY ./docker/*.json ./config/fcm.config.json

EXPOSE 5000
CMD [ "node", "--require=esm""bin/app.js" ]
