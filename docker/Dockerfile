FROM node:12-alpine

WORKDIR /app/hspns

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
