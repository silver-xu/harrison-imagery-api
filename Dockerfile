FROM mysql:5.7

ENV MYSQL_DATABASE imagery
ENV MYSQL_ROOT_PASSWORD=harrison
ENV TZ='Australia/Sydney'

COPY ./infra/schema/ /docker-entrypoint-initdb.d/
