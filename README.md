Docker Notifier
===============

Docker Notifier is a simple Docker container that forwards your Docker events to your favorite endpoint!

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
	-env TWILLIO_ACCOUNT_SID=*your_twillio_account_sid*
	-env TWILLIO_AUTH_TOKEN=*your_twillio_auth_token*
	-env TWILLIO_NOTIFICATION_SERVICE_SID=*your_twillio_notification_service_sid*
	--restart-policy always
	docker-notifier
```

Supported endpoints
-------------------

* Facebook Messenger (via [Twillio](https://www.twilio.com/))
* Slack

Manually running the event listener
-----------------------------------

1. Install go
2. `cd listener`
3. `export GOPATH=$(pwd)`
4. `cd src`
3. `go get -x github.com/mrPjer/mocker` (this will take a while)
4. `go build github.com/mrPjer/mocker && ./mocker`

Facebook Messenger over Twillio set up
--------------------------------------

To enable sending notifications to Facebook Messenger, you need the following:

* A Facebook page from which the messages will be sent
	* The page needs to be configured on Twillio under Programmable SMS -> Settings -> General and the request URL needs to point to the domain where you deployed the application and the endpoint messenger (i.e. *http://yourdomain.com:8989/messenger*)
* Twillio Notify with Facebook Messenger support enabled
	* A Notify service configured with your Facebook Messenger page
		* The service SID of that service

Once set up, users have to send a message to your Facebook page, at which point they will get registered for notifications. Afterwards, any Docker events will be propagated to your users via Facebook Messenger.
