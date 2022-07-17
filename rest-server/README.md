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

## Usage

The server exposes 3 endpoints. The base url for the live deployment is http://kgas-api.azurewebsites.net, or http://localhost if running locally (port can be configured but is 80 by default)

The endpoints are detailed in [OpenAPI spec](https://github.com/OAI/OpenAPI-Specification), which is used to generate the docs page with [SwaggerUI](https://swagger.io/tools/swagger-ui/). The API specification is saved in this direcotry under [`openapi_spec.yaml`](./openapi_spec.yaml), or can be viewed in the UI online at https://rupson.github.io/knowledge-graph-alignment-as-a-service/

The docs are deployed with Github pages and can be viewed here: https://rupson.github.io/knowledge-graph-alignment-as-a-service/