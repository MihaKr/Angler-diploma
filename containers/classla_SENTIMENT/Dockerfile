FROM python:3.11.9-slim

WORKDIR /usr/src/app

#RUN pip install numpy
RUN pip install classla

COPY classla_sentiment.py classla_sentiment.py
#COPY stanza_resources '/root/stanza_resources'

ENTRYPOINT ["python", "./classla_sentiment.py"]
#CMD ["tail", "-f", "/dev/null"]