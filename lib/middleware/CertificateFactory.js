var fs = require('fs');

var CertificateFactory = function(certificatLocation){
	function create(){
		var certificateOptions = {
				key: fs.readFileSync(certificatLocation + 'server.key'),
				cert: fs.readFileSync(certificatLocation + 'server.crt'),
				ca: fs.readFileSync(certificatLocation + 'ca.crt')
			};
		return certificateOptions;	
	}
	return {
		create : create
	};
};

module.exports = CertificateFactory;