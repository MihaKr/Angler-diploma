FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install stanza

COPY stanza_tokenize.py stanza_tokenize.py
#COPY stanza_resources '/root/stanza_resources'

ENTRYPOINT ["python", "./stanza_tokenize.py"]
#CMD ["tail", "-f", "/dev/null"]