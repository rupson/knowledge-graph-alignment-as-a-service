# Rest server

This is the http server which exposes logmap's functionality via a RESTful API.

Built using [ExpressJS](https://expressjs.com/)

## Developing

### Pre-requisites

* [NodeJS](https://nodejs.org/en/) (tested on v16.13.2 - previous versions not guaranteed to work)
* [yarn](https://yarnpkg.com/)

> Note that these are not required if running using docker. The project contains a [`Dockerfile`](./Dockerfile) which can be used to build the image.

### Environment

The app requires some environment variables to run. These can be provided in a .env file if running with docker (running with `yarn start` on host machine will not by default read from a .env file)

The required env vars are listed (in obfuscated form for secret values) in [the example env file](./.env.example). Copy the contents of this file into a new `.env` file (it is gitignored) and fill in the secret values with correct data.

### Scripts

```bash
yarn start
```
Starts the service in development mode. This spins up the server on port 4000. The server will reload in response to any changes made to the source code.

---

```bash
yarn build
```
Compile typescript code using [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## Endpoints

TODO

### POST /align

### Payload

### Responses

### Example usage

```bash
curl --location --request POST  '{{base-url}}/align'
```
