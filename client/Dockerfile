FROM node:14-alpine

WORKDIR /app

ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./

RUN yarn build
RUN npm i -g http-server

EXPOSE 8080

CMD ["http-server", "build"]
