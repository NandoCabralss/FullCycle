FROM node:lts-alpine3.16

WORKDIR /app

COPY src/index.js /app
COPY src/package.json /app

RUN npm install