FROM node:22-alpine

WORKDIR ng-pokedex-server

COPY package*.json ./
RUN npm i

COPY . .

ARG APP_DOCKER_PORT

ENV APP_DOCKER_PORT=${APP_DOCKER_PORT}

EXPOSE ${APP_DOCKER_PORT}

CMD [ "npm", "run", "start:prod" ]