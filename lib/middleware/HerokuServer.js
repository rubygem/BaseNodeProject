var registerRoutes = require('../../../registerRoutes');

var redirectToHttps = function(website){
	website.get('*',function(request,response,next){
		if(request.headers['x-forwarded-proto']!=='https'){
			var secure = 'https://' + request.host + request.url;
			response.redirect(secure);
		}
		else{
			next();
		}
	});
};


var HerokuServer = function(website){
	redirectToHttps(website);
	registerRoutes(website);
	function listen(port,callback){
		website.listen(port,callback);
	}
	return{
		listen:listen
	};
};

module.exports = HerokuServer;