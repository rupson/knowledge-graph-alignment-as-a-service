FROM node:alpine3.15

RUN apk add --update --no-cache openssh 

COPY .ssh /root/.ssh

RUN chmod 400 /root/.ssh

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY *.ts ./
COPY handlers handlers

EXPOSE 80

CMD ["yarn", "start"]
