FROM python:3.11.9-slim

WORKDIR /usr/src/app

ARG app_cont_id
ARG FILEPATH
ARG file_type


ENV APP_CONT_ID=${app_cont_id}
ENV FILEPATH_ENV=${FILEPATH}
ENV FILETYPE=${file_type}


#RUN pip install numpy
RUN pip install requests conllu

COPY store.py store.py
#COPY stanza_resources '/root/stanza_resources'

#ENTRYPOINT ["python", "./store.py"]
CMD ["tail", "-f", "/dev/null"]