var http = require('http'),
	registerRoutes = require('../../../registerRoutes');

var TestServer = function(website){
	var httpServer = http.createServer(website);
	registerRoutes(website);

	function listen(port,callback){
		httpServer.listen(port,callback);
	}

	return{
		listen:listen
	};
};

module.exports = TestServer;