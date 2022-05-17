# SSH

The project uses ssh to communicate between the container running logmap and the container running the rest server. 

## Running locally

SSH keys are not checked in to source control. To run locally you will need to add your own key for the containers to use.

### Generate a new key

If you already have a ssh key you can use, skip to [adding your key to service](#Adding-your-key-to-services).

* Use the `ssh-keygen` tool to create a new ssh key on your machine. 
```bash
ssh-keygen
```
* Follow the steps. This will generate a new public and private key for you to use.

### Adding your key to services

* Create a new directory names `.ssh` inside `rest-server`.
* Add into the new directory your **private key**. The server will use this to authenticate against the logmap container.
* Add your **public key** (`id_rsa.pub`) into the root of the `logmap` directory.

### Testing

To confirm the setup has worked:
* spin up both logmap and rest-server with docker-compose.
* `docker exec` into the rest-server container
* run `ssh user@logmap`. 
* Easy checks to confirm it has worked it running a command like `java` as this binary is only present inside logmap container.
