var http = require('http'),
	https = require('https'),
	registerRoutes = require('../../../registerRoutes'),
	RedirectWebsiteFactory = require('./RedirectWebsiteFactory'),
	CertificateFactory = require('./CertificateFactory'),
	CERTIFICATE_LOCATION = 'certificates/local/';

var DevelopmentServer = function(website){
	var SECURE_PORT = 8000,
		certificateOptions = new CertificateFactory(CERTIFICATE_LOCATION).create(),
		httpsServer = https.createServer(certificateOptions,website),
		redirectWebsite = new RedirectWebsiteFactory().create(SECURE_PORT),
		httpServer = http.createServer(redirectWebsite);
	registerRoutes(website);	

	function listen(port,callback){			
		httpsServer.listen(SECURE_PORT,function(){
			httpServer.listen(port,	callback);			
		});
	}

	return{
		listen:listen
	};
};

module.exports = DevelopmentServer;