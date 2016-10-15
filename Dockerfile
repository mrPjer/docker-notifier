FROM ubuntu:16.04
RUN \
  apt update && \
  apt -y upgrade && \
  apt install -y docker.io nodejs
COPY index.js /app/alexa-server
CMD /bin/bash
