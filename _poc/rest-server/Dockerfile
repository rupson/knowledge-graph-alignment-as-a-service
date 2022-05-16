FROM node:alpine3.15

RUN apk add --update --no-cache openssh 

COPY .ssh /root/.ssh

RUN chmod 400 /root/.ssh

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY index.ts index.ts

EXPOSE 3000

CMD ["yarn", "start"]
