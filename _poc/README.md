# Proof of Concept

A small sub-project developed as a proof of concept and learning aid with 2 purposes:
* Help me understand how to consume a dockerised CLI from a restful server written with different technology, using docker & docker-compose, without the additional complexity of any of the logic of the project.
* Demonstrate how I will implement one rest server consuming a CLI tool which is running in a separate container, to use as a reference when doing the same thing with logmap.

## Structure

The project contains 2 directories. 

### Doubler

This is the CLI (fulfilling the role that logmap has in the final project). This is a tiny CLI I wrote in python which when called, takes a number as argument, then outputs the double of that number to stdout.

### Rest-server

This is an express server which exposes a http-based API that when called consumes the python CLI. It does this by ssh-ing into the container on which the doubler CLI resides, using it inside that container, then sending results back to the client (rest-server) container.