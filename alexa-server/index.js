var http = require('http');
var exec = require('child_process').exec;

http.createServer(function (req, res) {
	if(req.url == '/status'){
		exec('docker ps --all --format="{{.Names}} {{.Status}}"', function(error, stdout, stderr){
			var response = stdout.replace('\n', ', ').slice(0, -1) + '.\n';
			response = response.replace(/\(.*?\)/g, '');
			res.end(response);
		});
	}else if(req.url == '/start'){
		exec('docker ps --all --filter "status=exited" --format="{{.Names}}"', function(error, stdout, stderr){
                        var response = stdout.replace('\n', ', ').slice(0, -1) + '.\n';
                        res.end(response);
			var containers = stdout.replace('\n', ' ');
			exec('docker start ' + containers);
                });
	}else if(req.url == '/stop'){
		exec('docker ps --format="{{.Names}}"', function(error, stdout, stderr){
                        var response = stdout.replace('\n', ', ').slice(0, -1) + '.\n';
                        res.end(response);
                        var containers = stdout.replace('\n', ' ');
                        exec('docker stop ' + containers);
                });
	}else if(req.url == '/restart'){
		exec('docker ps --format="{{.Names}}"', function(error, stdout, stderr){
                        var response = stdout.replace('\n', ', ').slice(0, -1) + '.\n';
                        res.end(response);
                        var containers = stdout.replace('\n', ' ');
                        exec('docker restart ' + containers);
                });
	}
}).listen(31337, "127.0.0.1");
