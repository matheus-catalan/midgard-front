FROM node:15-alpine

RUN apk update && apk add --no-cache --no-progress python make g++ gcc tzdata wget

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --prefer-offline --no-audit --progress=false

COPY . .

ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["npm", "run", "dev"]