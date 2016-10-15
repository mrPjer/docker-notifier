FROM ubuntu:16.04
RUN \
  apt update && \
  apt -y upgrade && \
  apt install -y \
    docker.io \
    nodejs \
    golang

COPY alexa-server/index.js /app/alexa-server/index.js

COPY listener /app/listener
RUN \
  cd /app/listener && \
  export GOPATH=`pwd` && \
  ls -la && \
  cd src && \
  go get -x github.com/mrPjer/mocker && \
  go build github.com/mrPjer/mocker

EXPOSE 80
CMD nodejs /app/alexa-server/index.js
