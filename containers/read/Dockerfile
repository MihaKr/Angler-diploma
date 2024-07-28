FROM python:3.11.9-slim

WORKDIR /usr/src/app

ARG app_cont_id
ENV APP_CONT_ID=${app_cont_id}

#RUN pip install numpy
RUN pip install requests

COPY copy_host_docker.py copy_host_docker.py
#COPY stanza_resources '/root/stanza_resources'

ENTRYPOINT ["python", "./copy_host_docker.py"]
#CMD ["tail", "-f", "/dev/null"]