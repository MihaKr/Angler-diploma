FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install stanza

COPY stanza_lemma.py stanza_lemma.py
COPY stanza_resources '/root/stanza_resources'

CMD ["python", "./stanza_lemma.py"]
#CMD ["tail", "-f", "/dev/null"]