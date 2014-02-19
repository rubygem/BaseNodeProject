var RollbarCaller = function(rollbar, token) {
		var rollbarClient = rollbar,
			rollbarToken = token;

		function log(message, environment) {
			if (!environment) {
				environment = process.env.NODE_ENV;
			}
			rollbarClient.init(rollbarToken);
			rollbarClient.reportMessage(message, environment);
			rollbarClient.shutdown();
		}

		return {
			log: log
		};
	};

module.exports = RollbarCaller;