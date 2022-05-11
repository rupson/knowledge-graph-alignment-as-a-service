FROM node:alpine3.15

WORKDIR /usr/src/app

# COPY package.json yarn.lock ./

# COPY src ./src
# COPY public ./public

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD [ "yarn", "start" ]
# CMD ["tail", "-f", "/dev/null"]