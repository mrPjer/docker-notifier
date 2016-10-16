var http = require('http');
var exec = require('child_process').exec;

http.createServer(function (req, res) {
	if(req.url == '/status'){
		exec('docker ps --all --format="{{.Names}} {{.Status}}"', function(error, stdout, stderr){
			var response = stdout.replace(/\n/g, ', ').slice(0, -2) + '.';
			response = response.replace(/docker .*?,/, '');
			response = response.replace(/\(.*?\)/g, '');
			res.end(response);
		});
	}else if(req.url == '/start'){
		exec('docker ps --all --filter "status=exited" --format="{{.Names}}"', function(error, stdout, stderr){
			stdout = stdout.replace('docker\n', '');
                        var response = stdout.replace(/\n/g, ', ').slice(0, -2) + '.';
                        res.end(response);
			var containers = stdout.replace(/\n/g, ' ');
			exec('docker start ' + containers);
                });
	}else if(req.url == '/stop'){
		exec('docker ps --format="{{.Names}}"', function(error, stdout, stderr){
			stdout = stdout.replace('docker\n', '');
                        var response = stdout.replace(/\n/g, ', ').slice(0, -2) + '.';
                        res.end(response);
                        var containers = stdout.replace(/\n/g, ' ');
                        exec('docker stop ' + containers);
                });
	}else if(req.url == '/restart'){
		exec('docker ps --format="{{.Names}}"', function(error, stdout, stderr){
			stdout = stdout.replace('docker\n', '');
                        var response = stdout.replace(/\n/g, ', ').slice(0, -2) + '.';
                        res.end(response);
                        var containers = stdout.replace(/\n/g, ' ');
                        exec('docker restart ' + containers);
                });
	}else if(req.url == '/is_down'){
		 exec('docker ps --all --filter "status=exited" --format="{{.Names}}"', function(error, stdout, stderr){
                        var hasAny = stdout.replace(/\n/g, '');
			if(hasAny == ''){
				res.end('0');
			}else{
				res.end('1');
			}
                });
	}else{
		res.end('works');
	}
}).listen(31337, "0.0.0.0");

