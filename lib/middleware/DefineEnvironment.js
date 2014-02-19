var PRODUCTION_ENVIRONMENT = 'production',
	defineEnvironment = function(request, response, next){
			response.locals.production = (process.env.NODE_ENV === PRODUCTION_ENVIRONMENT);
			next();
	};	

module.exports =  defineEnvironment;