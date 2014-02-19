var FileSystem = require('fs'),
	_ = require('underscore'),
	ROUTES_DIRECTORY = './routes';

module.exports = function(website){
	FileSystem.readdir(ROUTES_DIRECTORY, function(errors, files){
		_.each(files, function(file){
			require(ROUTES_DIRECTORY + '/' +file)(website);
		});	
	});
};
