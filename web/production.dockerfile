FROM node:alpine3.15 as BUILDER

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN REACT_APP_LOGMAP_API_URL=https://kgas-api.azurewebsites.net yarn build

FROM node:alpine3.15 as TARGET

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/build ./build/

RUN yarn global add serve

EXPOSE 80

CMD [ "serve", "-s", "build", "-l",  "80" ]