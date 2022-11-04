# Knowledge Graph Alignment as a service

Monolithic repository containing full stack application for Knowledge Graph Alignment as a Service. Exposes CLI functionality of [Logmap](https://github.com/ernestojimenezruiz/logmap-matcher) to users via a RESTful API and a web interface.

Contains 3 primary applications:<br/>
[**logmap**](./logmap) | [**rest server**](./rest-server) | [**webapp**](./web)

## Using KGAS

[See the live API spec](https://rupson.github.io/knowledge-graph-alignment-as-a-service/)

KGAS can be used via a UI on [the web app's live deployment](https://kgas-web.azurewebsites.net/). The API can also be consumed directly - read [the documentation in the API's README](./rest-server/README.md#usage) for details.

## Developing locally

The project consists of 3 applications. These are configured for local development with [`docker-compose`](https://docs.docker.com/compose/).

### Pre-requisites

* [Docker](https://docs.docker.com/get-docker/) (recent versions come with docker-compose out of the box)
* ssh key for inter-service communication. See [ssh-setup](./docs/ssh-setup.md).

Docker handles all dependencies for you, so no other pre-requisites are required. 
For running any one service individually, this cal still be done with docker compose (`docker-compose {{service-name}}`), or see the readme for that service.

### Developing

* Build docker images for all services with `docker-compose build`
* Run all services with `docker-compose up`

### Hot-reloads

Both the webapp and the rest server will respond to file changes in the source code and reload for you without you needing to rebuild or restart the service.
Logmap itself will not do this as it is an external dependency of the project.

## Publications

Rob Upson, Ernesto Jiménez-Ruiz. **Knowledge Graph Alignment as a Service**. International Semantic Web Conference. Poster & Demos, 2022. [(PDF paper)](http://star.informatik.rwth-aachen.de/Publications/CEUR-WS/Vol-3254/paper382.pdf) [(Demo Web)](https://rupson.github.io/kgas-gh-pages/)
