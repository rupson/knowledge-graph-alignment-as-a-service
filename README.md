# Knowledge Graph Alignment as a service

Monolithic repository containing full stack application for Knowledge Graph Alignment as a Service. Exposes CLI functionality of [Logmap](https://github.com/ernestojimenezruiz/logmap-matcher) to users via a web interface and a RESTful API.

## Developing locally

The project consists of 3 applications. These are configured for local development with [`docker-compose`](https://docs.docker.com/compose/).

### Pre-requisites

* [Docker](https://docs.docker.com/get-docker/) (recent versions come with docker-compose out of the box)
* ssh key for inter-service communication. See [ssh-setup](./docs/ssh-setup).

Docker handles all dependencies for you, so no other pre-requisites are required. 

### Developing

* Build docker images for all services with `docker-compose build`
* Run all services with `docker-compose up`

### Hot-reloads

Both the webapp and the rest server will respond to file changes in the source code and reload for you without you needing to rebuild or restart the service.
Logmap itself will not do this as it is an external dependency of the project.

