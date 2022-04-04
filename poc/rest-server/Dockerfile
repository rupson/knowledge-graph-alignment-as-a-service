FROM node:alpine3.15

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY index.ts index.ts

EXPOSE 3000

CMD ["yarn", "start"]
