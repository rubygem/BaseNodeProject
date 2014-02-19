var InternalServerError = function(errorLogger){

	function renderErrorPage(error,request,response,next){
		errorLogger.log(error.stack);
		response
			.status(500)
			.render('error',{errorMessage: "We're sorry. The application experienced an error. Don't worry our crack team of developers know about this!"});
	}
	return{
		renderErrorPage:renderErrorPage
	};
};

module.exports = InternalServerError;