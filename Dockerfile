FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

RUN pm2 install typescript

COPY package*.json ./
RUN npm install

COPY . .

