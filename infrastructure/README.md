# Infrastructure

This directory contains all of the infrastructure as code for the project. 

## Pre-requisites

* Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli). The Azure terraform provider requires the Azure CLI in order to authenticate with Azure
* Export the following env vars for an Azure account with access to the project (contact project owner for access and env var values)
  * ARM_SUBSCRIPTION_ID: Azure subscription ID
  * ARM_TENANT_ID: Tenant ID for the terraform application
  * ARM_CLIENT_ID: Terraformer service principal ID
  * ARM_CLIENT_SECRET: Terraformer service principal password
  * ARM_ACCESS_KEY: Secret access key for the remote terraform state storage account



## Technical detail

This project uses [Azure, Microsoft's cloud provider](https://azure.microsoft.com/). Azure's cloud resources required for this project are defined and maintained using Infrastructure as Code (IaC), using [Terraform by Hashicorp](https://www.terraform.io/).

Specifically the [Azure Terraform Provider](https://registry.terraform.io/providers/hashicorp/azurerm/3.10.0) is used for configuring Azure resources.

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
