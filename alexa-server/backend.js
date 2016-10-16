var Alexa = require('alexa-sdk');
var http = require('http');
var options = {
  host: '37.139.15.23',
  port: '31337',
};
    
// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(commandHandlers);
    alexa.execute();
};

var commandHandlers = {
    'StatusIntent': function () {
        var container = this.event.request.intent.slots.Container.value;
        options.path = '/status';
        var t = this;
        http.request(options, function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                t.emit(':tell', 'Statuses are: ' + str);
            });
        }).end();
    },
    'StartIntent': function () {
        var container = this.event.request.intent.slots.Container.value;
        options.path = '/start';
        var t = this;
        http.request(options, function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                t.emit(':tell', 'Starting containers: ' + str);
            });
        }).end();
    },
    'StopIntent': function () {
        var container = this.event.request.intent.slots.Container.value;
        options.path = '/stop';
        var t = this;
        http.request(options, function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                t.emit(':tell', 'Stopping containers: ' + str);
            });
        }).end();
    },
    'RestartIntent': function () {
        var container = this.event.request.intent.slots.Container.value;
        options.path = '/restart';
        var t = this;
        http.request(options, function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                t.emit(':tell', 'Restarting containers: ' + str);
            });
        }).end();
    },
    'TestIntent': function () {
        this.emit(':tell', 'Testing.');
    },
};
