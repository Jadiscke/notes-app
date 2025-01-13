#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Define variables for PostgreSQL container
CONTAINER_NAME="pg_notes_app"
POSTGRES_VERSION="latest"  # You can change this to a specific version like "13.3" if needed
POSTGRES_PASSWORD="password"  # Change this to your desired password
POSTGRES_PORT="5432"  # Change this if you want to map to a different port
POSTGRES_USER="postgres"
POSTGRES_DB="db"

# Run PostgreSQL container
docker run -d \
    --name $CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$POSTGRES_USER \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e POSTGRES_DB=$POSTGRES_DB \
    -p $POSTGRES_PORT:5432 \
    postgres:$POSTGRES_VERSION

# Check if the container started successfully
if [ $? -eq 0 ]; then
    echo "PostgreSQL container '$CONTAINER_NAME' is running."
else
    echo "Failed to start PostgreSQL container '$CONTAINER_NAME'."
fi
