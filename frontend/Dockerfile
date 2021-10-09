FROM node:current-alpine

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarnpkg install --modules-folder /node_modules

COPY . ./

CMD ["yarnpkg", "start"]
