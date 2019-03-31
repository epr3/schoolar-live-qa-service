FROM node:11

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run db:migrate