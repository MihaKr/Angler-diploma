FROM python:3.11.9-slim

WORKDIR /usr/src/app

ARG app_cont_id
ENV APP_CONT_ID=${app_cont_id}

RUN pip install requests

COPY func.py func.py

CMD ["python", "./func.py"]
#CMD ["tail", "-f", "/dev/null"]