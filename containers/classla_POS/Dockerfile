FROM python:3.11.9-slim

WORKDIR /usr/src/app

RUN pip install classla

COPY classla_pos.py classla_pos.py
#COPY stanza_resources '/root/stanza_resources'

ENTRYPOINT ["python", "./classla_pos.py"]
