FROM node:16-alpine3.15

RUN apk update

RUN apk add gdb ncurses-dev libc-dev

WORKDIR /app

COPY . /app

CMD node index.js
