FROM node:current-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarnpkg install

COPY . ./

RUN yarnpkg build

CMD ["yarnpkg", "start"]
