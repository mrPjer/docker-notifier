Docker Notifier mit Alexa Stimmenkontrolle
==========================================

Docker Notifier is a simple Docker container that forwards your Docker events to your favorite endpoint!

Using [Amazon Alexa](https://developer.amazon.com/alexa), Docker Notifier allows you to use your voice to start, stop and restart your containers!

Usage
-----

First, build the container by cloning the repo and running:

`docker build -t docker-notifier .`

To run Docker Notifier, run the container on the same system for which you want the events to propagate from. Mount docker.sock into the container and set up the API keys with environment variables.

```
docker run \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-p 8989:8989 \
	-p 31337:31337 \
	--env TWILIO_ACCOUNT_SID=your_twillio_account_sid \
	--env TWILIO_AUTH_TOKEN=your_twillio_auth_token \
	--env TWILIO_NOTIFICATION_SERVICE_SID=your_twillio_notification_service_sid \
	--env SLACK_ENDPOINT=your_slack_integration_url \
	--restart-policy always \
   --name docker-notifier
	docker-notifier
```

Supported endpoints
-------------------

* Facebook Messenger (via [Twilio](https://www.twilio.com/))
* Slack (via a custom *Incoming WebHook* integration)

Manually running the event listener
-----------------------------------

1. Install go
2. `cd listener`
3. `export GOPATH=$(pwd)`
4. `cd src`
3. `go get -x github.com/mrPjer/mocker` (this will take a while)
4. `go build github.com/mrPjer/mocker && ./mocker`

Facebook Messenger over Twilio set up
--------------------------------------

To enable sending notifications to Facebook Messenger, you need the following:

* A Facebook page from which the messages will be sent
	* The page needs to be configured on Twilio under Programmable SMS -> Settings -> General and the request URL needs to point to the domain where you deployed the application and the endpoint messenger (i.e. *http://yourdomain.com:8989/messenger*)
* Twilio Notify with Facebook Messenger support enabled
	* A Notify service configured with your Facebook Messenger page
		* The service SID of that service

Once set up, users have to send a message to your Facebook page, at which point they will get registered for notifications. Afterwards, any Docker events will be propagated to your users via Facebook Messenger.

Slack set up
------------

To get messages on a Slack channel, create a new *Incoming WebHooks* Custom Integration and provide the URL as the SLACK_ENDPOINT environment variable.

Amazon Alexa set up
-------------------

It's quite simple to use Alexa with this service!

* Grab your Amazon Echo and connect it to your dev account.

* Follow instructions on [ask-liz](bit.ly/ask-liz) to get an idea of which code to put where.

* The code that you will use is located in the [alexa-server](alexa-server) folder.

* Enjoy the four supported intents:
	* "Alexa, ask docker about statuses."
	* "Alexa, tell docker to stop."
	* "Alexa, tell docker to restart."
	* "Alexa, tell docker to start."
