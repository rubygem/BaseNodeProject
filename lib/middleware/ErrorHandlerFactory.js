var internalServerError = require('./InternalServerErrorFactory').create();

var ErrorHandlerFactory = function(express){
    var environment = process.env.NODE_ENV;
    function create(){
        if(environment === 'production'){
            return internalServerError.renderErrorPage;
        }
        return express.errorHandler();
    }
    return{
        create: create
    };
};

module.exports = ErrorHandlerFactory;