'use strict';

const PORT = 9999;

var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').load();

const twilio = require('twilio');

// Authenticate with Twilio
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Create a reference to the user notification service
const service = client.notify.v1.services(process.env.TWILIO_NOTIFICATION_SERVICE_SID);

let message = 'We got a new Docker notification!';
let title = 'Docker Time!';

var sendMessage = function(title, message) {
    // Send a notification
    service.notifications.create({
      'tag':'facebook-messenger',
      'title': title,
      'body': message,
      'gcm': JSON.stringify({ data: { title: title, message: message}})
    }).then(function(response) {
      console.log('Notified!');
    }).catch(function(error) {
      console.log(error);
    });
};


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/', function(req, res) {
	var container = {
		name: req.body.name,
		image: req.body.image,
		id: req.body.id,
		action: req.body.action
	};

	console.log(container);
	res.send("ok");
	sendMessage(title, message);
});

app.listen(PORT, function() {
	console.log("Status server listening on port " + PORT);
});
