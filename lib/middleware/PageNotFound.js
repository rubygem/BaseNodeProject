var pageNotFound = function(request,response){
	response
		.status(404)
		.render('error', {errorMessage:"We're sorry. The Web address you entered is not a functioning page on our site"});
};

module.exports = pageNotFound;