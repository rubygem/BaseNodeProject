var express = require('express'), 
    path = require('path'),
    less = require('less-middleware'),
    passport = require('passport'),
    defineEnvironment = require('./lib/middleware/DefineEnvironment'),
    pageNotFound = require('./lib/middleware/PageNotFound'),
    ErrorHandlerFactory = require('./lib/middleware/ErrorHandlerFactory'),
    ServerFactory = require('./lib/middleware/ServerFactory'),
    SessionFactory = require('./lib/middleware/SessionFactory');


var errorHandlerFactory = new ErrorHandlerFactory(express),
    website = express(),
    ROOT_DIRECTORY = __dirname,
    ASSETS_DIRECTORY = path.join(ROOT_DIRECTORY, 'public'),
    PAGE_DIRECTORY = path.join(ROOT_DIRECTORY, 'views');

website.set('views', PAGE_DIRECTORY);
website.set('view engine', 'ejs');
website.use(express.favicon(__dirname + '/public/images/favicon.ico'));
website.use(express.logger('dev'));
website.use(express.bodyParser());
website.use(express.methodOverride());
website.use(express.cookieParser("my_precious"));
website.use(express.session(new SessionFactory().create()));
website.use(express.bodyParser());
website.use(passport.initialize());
website.use(passport.session()); 
website.use(defineEnvironment);
website.use(website.router);
website.use(less({ src: __dirname + '/public' }));
website.use(express.static(ASSETS_DIRECTORY));
website.use(pageNotFound);
website.use(errorHandlerFactory.create());

website.enable('verbose errors');

website.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});

var server = new ServerFactory().create(website,process.env.NODE_ENV);
server.listen(process.env.PORT,function(){
    console.log("Snap administrator app has started!");
});

