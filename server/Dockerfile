FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./

EXPOSE 4000

CMD ["yarn", "start"]
