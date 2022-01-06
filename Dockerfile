#FROM node:16-alpine3.15
FROM alpine

RUN apk update

RUN apk add gdb ncurses-dev libc-dev nodejs npm

WORKDIR /app

COPY . /app

CMD node index.js
