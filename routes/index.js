
module.exports = function(website){
	website.get('/', function(request, response){
		response.render('index');	
	});
};
