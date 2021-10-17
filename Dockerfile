FROM python:3.8
ENV PYTHONBUFFERED=1
WORKDIR /code
COPY Pipfile /code/
COPY Pipfile.lock /code/
RUN pip install pipenv 
RUN pipenv sync
COPY . /code/


