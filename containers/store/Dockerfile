FROM python:3.11.9-slim

WORKDIR /app

# Define build-time argument
ARG FILEPATH

# Set environment variable
ENV FILEPATH_ENV=${FILEPATH}

# Debug echo for build-time (this won't work as expected here, better for runtime)
# RUN echo $FILEPATH_ENV

COPY copy_docker_host.sh /app/

RUN chmod +x /app/copy_docker_host.sh

# Adjust ENTRYPOINT to use the environment variable

ENTRYPOINT /bin/sh /app/copy_docker_host.sh $FILEPATH_ENV

#CMD ["tail", "-f", "/dev/null"]