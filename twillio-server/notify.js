'use strict';

require('dotenv').load();

const twilio = require('twilio');

// Authenticate with Twilio
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Create a reference to the user notification service
const service = client.notify.v1.services(process.env.TWILIO_NOTIFICATION_SERVICE_SID);

let message = 'We have new delicious mozzarella pizza!';
let title = 'Pizza Time!';

service.bindings.list().then(function(response) {

		  console.log(response);
});

// Send a notification 
service.notifications.create({
  'tag':'all',
  'title': title,
  'body': message,
  'gcm': JSON.stringify({ data: { title: title, message: message}})
}).then(function(response) {
  console.log('Notified!');
  console.log(response);
}).catch(function(error) {
  console.log(error);
});
