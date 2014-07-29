var connect = require('connect');
connect.createServer(
	connect.static(__dirname + '/../dist/')
).listen(55555);
