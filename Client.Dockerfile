FROM node:12 AS builder

COPY . /usr/app
WORKDIR /usr/app

RUN npm i && npm run build:client
RUN rm -rf node_modules

FROM nginx

ARG PORT=80

ENV NGINX_PORT ${PORT}

COPY --from=builder /usr/app/public /usr/share/nginx/html
