#! /bin/bash

CURRENT_DIR_NAME="${PWD##*/}"
SERVICE_NAME="${SERVICE_NAME:-$CURRENT_DIR_NAME}"
LATEST_COMMIT_HASH=$(git log --pretty=format:'%h' -n 1)
IMAGE_TAG="${IMAGE_TAG:-$LATEST_COMMIT_HASH}"

echo "Tagging and pushing ${SERVICE_NAME}:${IMAGE_TAG}"

az acr login --name kgasacr

docker tag "${SERVICE_NAME}:${IMAGE_TAG}" "kgasacr.azurecr.io/${SERVICE_NAME}:${IMAGE_TAG}"

docker push "kgasacr.azurecr.io/${SERVICE_NAME}:${IMAGE_TAG}"
