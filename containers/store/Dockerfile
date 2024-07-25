FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install requests

COPY store.py store.py
#COPY stanza_resources '/root/stanza_resources'

#ENTRYPOINT ["python", "./copy_host_docker.py"]
CMD ["tail", "-f", "/dev/null"]