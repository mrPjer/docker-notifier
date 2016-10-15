FROM ubuntu:16.04
RUN \
  apt update && \
  apt -y upgrade && \
  apt install -y docker.io nodejs
COPY alexa-server/index.js /app/alexa-server/index.js
EXPOSE 80
CMD nodejs /app/alexa-server/index.js
