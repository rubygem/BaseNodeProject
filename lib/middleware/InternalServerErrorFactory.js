var InternalServerError = require('./InternalServerError'),
	SimpleLoggly = require('simple-loggly'),
	logglyKey = process.env.LOGGLY_ERROR_KEY,
	rollbar = require('rollbar'),
	RollbarCaller = require('./RollbarCaller'),
	rollbarToken = process.env.ROLLBAR_ADMIN_TOKEN,
	ErrorLogger = require('./ErrorLogger');

var InternalServerErrorFactory = function() {
		function create() {
			var loggly = new SimpleLoggly(logglyKey),
				rollbarCaller = new RollbarCaller(rollbar, rollbarToken),
				errorLogger = new ErrorLogger(loggly, rollbarCaller);

				return new InternalServerError(errorLogger);
		}

		return {
			create: create
		};
	};

module.exports = new InternalServerErrorFactory();