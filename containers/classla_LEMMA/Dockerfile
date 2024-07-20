FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install classla

COPY classla_lemma.py classla_lemma.py
#COPY stanza_resources '/root/stanza_resources'

CMD ["python", "./classla_lemma.py"]
#CMD ["tail", "-f", "/dev/null"]