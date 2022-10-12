FROM node:16.17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /usr/local/etc/redis/redis.conf

COPY . .

CMD npm start