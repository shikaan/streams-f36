FROM node:12

COPY . /usr/app
WORKDIR /usr/app

RUN npm ci --production
RUN npm i -g damien

EXPOSE 1234

ENTRYPOINT damien ./api/server.js
