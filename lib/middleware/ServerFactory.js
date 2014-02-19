var TestServer = require('./servers/TestServer'),
    DevelopmentServer = require('./servers/DevelopmentServer'),
    HerokuServer = require('./servers/HerokuServer');

var ServerFactory = function(){
    var serverTypes = {
        'production' : HerokuServer,
        'test' : TestServer,
        'development' : DevelopmentServer,
        undefined : DevelopmentServer
    };

    function create(website,environment){
        var ServerType = serverTypes[environment];
        return new ServerType(website);     
    }
    return{
        create:create
    };
};

module.exports = ServerFactory;