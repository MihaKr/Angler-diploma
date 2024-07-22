FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install stanza

COPY stanza_ner.py stanza_ner.py
COPY stanza_resources '/root/stanza_resources'

#ENTRYPOINT ["python", "./stanza_ner.py"]
CMD ["tail", "-f", "/dev/null"]