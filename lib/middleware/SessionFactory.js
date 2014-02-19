var Session = require('connect-mongodb');

var SessionFactory = function(){
  var session =  new Session({ url: process.env.DATA_STORE_CONNECTION_STRING}); 

  function create(){
	if(process.env.NODE_ENV !== 'test'){
		return {
			store: session,
			secret:'secret',
			cookie: {
				domain: process.env.COOKIE_DOMAIN
			}
		};
	}
  }

  return {
	create:create
  };
};

module.exports = SessionFactory;