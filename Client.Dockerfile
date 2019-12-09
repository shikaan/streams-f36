FROM node:12 AS builder

ENV PORT 80
ENV NGINX_PORT ${PORT}

COPY . /usr/app
WORKDIR /usr/app

RUN npm i && npm run build:client && npm run clean

FROM nginx
COPY --from=builder /usr/app/dist/client /usr/share/nginx/html
