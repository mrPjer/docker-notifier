set -e;
docker login $1;
docker run \
	-d \
	-p 80:80 \
	--restart=always \
	--name web \
	$1/docker-notifier/static;
docker run \
	-d \
	-p 8989:8989 \
	-p 31337:31337 \
	-v /var/run/docker.sock:/var/run/docker.sock \
	--env TWILIO_ACCOUNT_SID=$2 \
	--env TWILIO_AUTH_TOKEN=$3 \
	--env TWILIO_NOTIFICATION_SERVICE_SID=$4 \
	--env SLACK_ENDPOINT=$5 \
	--name docker-notifier \
	$1/docker-notifier/backend;
