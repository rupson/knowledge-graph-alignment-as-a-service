#! /bin/bash

LATEST_COMMIT_HASH=$(git log --pretty=format:'%h' -n 1)

docker buildx build --output=type=docker --platform=linux/amd64 -t rest-server:$LATEST_COMMIT_HASH .