FROM python:3.11.9-slim

WORKDIR /usr/src/app

RUN pip install classla

COPY ner_classla.py ner_classla.py
COPY classla_resources '/root/classla_resources'

CMD ["python", "./ner_classla.py"]
#CMD ["tail", "-f", "/dev/null"]