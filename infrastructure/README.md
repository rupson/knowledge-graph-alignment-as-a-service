# Infrastructure

This directory contains all of the infrastructure as code for the project. 

## Technical detail

This project uses [Azure, Microsoft's cloud provider](https://azure.microsoft.com/). Azure's cloud resources required for this project are defined and maintained using Infrastructure as Code (IaC), using [Terraform by Hashicorp](https://www.terraform.io/).

## High level overview of project infra

@TODO: diagram resources involved in project infrastructure

### Containers

#### Logmap

Runs the logmap maven CLI and openssh server.

#### Rest server

Runs the node/express server and exposes http api to the internet.

#### Webapp (should be static served from blob storage???)

Container serving the static html files produced by create-react-app

### Storage

#### Input ontologies

BlobStorage in which the input ontologies uploaded form the web are held

#### Alignment output files

BlobStorage containing directories named after the respective alignment id, which will store the output of the given alignment.

#### Remote terraform state

Remote directory to store terraform's state and lockfiles. This is how terraform tracks and applies changes when the IaC is updated.

### Load balancer

Controls intra-container traffic and communication from external parties (e.g. user's web client)
