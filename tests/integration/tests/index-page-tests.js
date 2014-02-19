var assert = require('assert'),
	Browser = require('zombie'),
	http = require('http');

require('chai').should();

describe('When I navigate to the root page', function(){	
	var browser = new Browser({site : process.env.BASE_URI});

	before(function(done){
		browser.visit('/',function(){
			done();
		});
	});

	it('then I see the home page',function(){
		browser.statusCode.should.equal(200);
	});
});