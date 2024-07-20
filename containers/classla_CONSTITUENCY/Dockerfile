FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install classla

COPY classla_constituency.py classla_constituency.py
#COPY stanza_resources '/root/stanza_resources'

CMD ["python", "./classla_constituency.py"]
#CMD ["tail", "-f", "/dev/null"]