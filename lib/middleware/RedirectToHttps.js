var RedirectToHttps = function(securePort){		
	function handle(request,response){
		if(!request.secure){
			response.redirect("https://" + request.host + ":" + securePort + request.url);
		}
	}
	return handle;
};

module.exports = RedirectToHttps;