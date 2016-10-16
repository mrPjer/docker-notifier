FROM ubuntu:16.04
RUN \
  apt update && \
  apt -y upgrade && \
  apt install -y \
    docker.io \
    nodejs \
    wget && \
  wget https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz && \
  tar -zxvf  go1.7.1.linux-amd64.tar.gz -C /usr/local/

ENV PATH $PATH:/usr/local/go/bin

COPY alexa-server/index.js /app/alexa-server/index.js

COPY listener /app/listener
RUN \
  cd /app/listener && \
  export GOPATH=`pwd` && \
  cd src && \
  go get -x github.com/mrPjer/mocker && \
  go build github.com/mrPjer/mocker

EXPOSE 31337
CMD /app/listener/src/mocker && nodejs /app/alexa-server/index.js
