FROM python:3.11.9-slim

WORKDIR /usr/src/app


#RUN pip install numpy
RUN pip install classla

COPY tokenize_classla.py tokenize_classla.py
COPY classla_resources '/root/classla_resources'

CMD ["python", "./tokenize_classla.py"]
#CMD ["tail", "-f", "/dev/null"]