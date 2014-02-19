var express = require('express'),
    http = require('http');


var HttpsPortRedirectWebsiteFactory = function(){
    var redirectWebsite = express();

    function create(fromPort,toPort){
        redirectWebsite.use(function(request,response){
             var httpsBaseUri = process.env.BASE_URI
                                    .replace(PORT,SECURE_PORT)
                                    .replace(fromPort,toPort);     
            response.redirect(httpsBaseUri + request.url);
         });    
        
        return redirectWebsite;
    }
    
    return{
        create: create
    };
};



var HttpServerFactory = function(application){
    var redirectWebsite = new HttpsPortRedirectWebsiteFactory();

    function create(environment){
        if (environment === 'production' || environment === 'test' ) {  
            return http.createServer(application);
        } 
        return redirectWebsite.create(PORT,SECURE_PORT);
    }

    return{
        create:create
    };
};

module.exports = HttpServerFactory;