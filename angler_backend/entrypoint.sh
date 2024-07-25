#!/bin/bash

./manage.py collectstatic --noinput
./manage.py migrate

./manage.py insert_data

./manage.py runserver 0.0.0.0:8000