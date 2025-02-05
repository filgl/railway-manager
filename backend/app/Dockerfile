FROM python:3.13.1-slim-bullseye
LABEL maintainer="RailwayManager"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements*.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .

CMD ./manage.py migrate && \
    gunicorn core.wsgi:application --bind 0.0.0.0:8000
