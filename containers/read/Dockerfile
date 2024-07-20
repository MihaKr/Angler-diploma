FROM alpine:latest

WORKDIR /app
COPY copy_host_docker.sh /app/

RUN chmod +x /app/copy_host_docker.sh

ENTRYPOINT ["/bin/sh", "/app/copy_host_docker.sh"]
#RUN echo $FILEPATH
#CMD ["tail", "-f", "/dev/null"]