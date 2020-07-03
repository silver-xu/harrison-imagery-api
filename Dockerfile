FROM mysql:5.7

ENV MYSQL_DATABASE imagery
ENV MYSQL_ROOT_PASSWORD=harrison

COPY ./infra/schema/ /docker-entrypoint-initdb.d/
