FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy your bash script to the container
COPY copy_host_docker.sh /app/

# Make the script executable
RUN chmod +x /app/copy_host_docker.sh

# Set the entry point to execute the script with bash
ENTRYPOINT ["/bin/sh", "/app/copy_host_docker.sh"]
