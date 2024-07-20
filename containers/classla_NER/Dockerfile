FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install classla

COPY classla_ner.py classla_ner.py
#COPY stanza_resources '/root/stanza_resources'

ENTRYPOINT ["python", "./classla_ner.py"]
#CMD ["tail", "-f", "/dev/null"]