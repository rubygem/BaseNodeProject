var ErrorLogger = function(simpleLoggly, rollbarCaller) {

		loggly = simpleLoggly;
		rollbar = rollbarCaller;

		var log = function(message) {
				loggly.log(message);
				rollbar.log(message);
			};

		return {
			log: log
		};
	};

module.exports = ErrorLogger;