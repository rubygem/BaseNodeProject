var express = require('express'),
	RedirectToHttps = require('./RedirectToHttps');

var RedirectWebsiteFactory = function(){
	function create(securePort){
		var redirectWebsite = express();
		redirectWebsite.use(RedirectToHttps(securePort));
		return redirectWebsite; 
	}

	return {
		create : create
	};
};

module.exports = RedirectWebsiteFactory;