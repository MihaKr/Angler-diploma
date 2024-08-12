FROM python:3.11.9-slim

WORKDIR /usr/src/app

ARG lang
ENV LANG=${lang}

RUN pip install stanza


COPY stanza_pos.py stanza_pos.py
COPY stanza_resources '/root/stanza_resources'

ENTRYPOINT ["python", "./stanza_pos.py"]
#CMD ["tail", "-f", "/dev/null"]