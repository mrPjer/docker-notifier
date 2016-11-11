export DOCKER_API_VERSION=1.24;
nohup /app/listener/bin/mocker 2>&1> /var/log/mocker.log  &
nohup nodejs /app/twillio/index.js 2>&1> /var/log/twilio.log &
nohup nodejs /app/twillio/notifier.js 2>&1> /var/log/twilio-not.log &
nodejs /app/alexa-server/index.js
