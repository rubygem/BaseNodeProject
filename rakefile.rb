task :default => [:clear,:tests, :jshint, :git]
multitask :tests => [:unit_tests,:integration_tests]
multitask :dependencies => [:node_dependencies, :ruby_dependencies]
@run_options = {verbose: Rake.application.options.trace}
NYAN_REPORTER = 'nyan'

task :clear do
	rake_sh 'clear'
end

task :ruby_dependencies do
	rake_sh 'bundle install --path gems'
end

task :node_dependencies do
	rake_sh 'npm update'
end

task :jshint do
	rake_sh 'jshint ./tests ./lib ./routes'
end

task :migrate_db do
	rake_sh "mongo data-store --eval \"db.dropDatabase()\""
	rake_sh "mongo view-store --eval \"db.dropDatabase()\""
	rake_sh "mongo event-store --eval \"db.dropDatabase()\""
	rake_sh 'mongorestore ./tests/integration/dump --directoryperdb --drop'
end

task :validate_html => :ruby_dependencies do
	require 'bundler/setup'
	require 'httparty'
	require './rake_tools/HtmlValidator'
	
	INTEGRATION_TEST_LOCATION = './tests/integration'
	in_sandbox(INTEGRATION_TEST_LOCATION) do | sandbox_location |
		in_test_mode do 
			run_website("#{sandbox_location}/website.js") do 
				log_user_into_session
				uri = ENV['BASE_URI']
				HtmlValidator.new(root_uri: uri, route_directory: './routes',ignore: ['./routes/authenticate.js']).validate			
			end
		end
	end
end

task :git => :ruby_dependencies do 
	require 'bundler/setup'
	require 'git_repository'
	message = ENV['m']
	raise 'no commit message specified' if message.nil?
	git = GitRepository.new
	git.pull
	git.add
	git.commit(message: message )
	git.push
end

task :unit_tests do
	test_format = 'qunit'
	mocha("./tests/unit",NYAN_REPORTER,test_format)
end

task :integration_tests => :migrate_db do
	require './rake_tools/FakeNpmModules'
	INTEGRATION_TEST_LOCATION = './tests/integration'
	in_sandbox(INTEGRATION_TEST_LOCATION) do | sandbox_location |
		in_test_mode do 
			run_website("#{sandbox_location}/website.js") do 
				reporter = NYAN_REPORTER unless committing_code?
				reporter = 'markdown > ./documentation/detailed.md' if committing_code?	
				test_format = 'tdd'
				mocha("#{INTEGRATION_TEST_LOCATION}/tests",reporter,test_format)
			end
		end
	end
end

def committing_code?
	ENV['m'] != nil
end

def in_sandbox(location, &block)	
	content_to_copy = ['website.js', 'registerRoutes.js', 'routes', 'views', 'public','lib']
	sandbox = "#{location}/sandbox"
	rm_rf sandbox, @run_options
	mkdir sandbox, @run_options
	content_to_copy.each do | content |
		cp_r content, sandbox, @run_options
	end
	begin
		block.call(sandbox)
	ensure
		rm_rf sandbox, @run_options
	end
end

def run_website(website, &block)		
	rake_sh "node #{website} &"
	begin
		block.call
	ensure
		rake_sh 'pkill node'
	end
end

def in_test_mode(&block)
	node_env = ENV['NODE_ENV']
	view_store_connection_string = ENV['VIEW_STORE_CONNECTION_STRING']
	data_store_connection_string = ENV['DATA_STORE_CONNECTION_STRING']
	event_store_connection_string = ENV['EVENT_STORE_CONNECTION_STRING']
	ENV['NODE_ENV'] = 'test'
	ENV['VIEW_STORE_CONNECTION_STRING'] = 'mongodb://localhost/view-store'
	ENV['DATA_STORE_CONNECTION_STRING'] = 'mongodb://localhost/data-store'
	ENV['EVENT_STORE_CONNECTION_STRING'] = 'mongodb://localhost/event-store'
	begin
		block.call
	ensure
		ENV['NODE_ENV'] = node_env
		ENV['VIEW_STORE_CONNECTION_STRING'] = view_store_connection_string
		ENV['DATA_STORE_CONNECTION_STRING'] = data_store_connection_string
		ENV['EVENT_STORE_CONNECTION_STRING'] = event_store_connection_string
	end
end

def mocha(test_location,reporter,test_format)
	rake_sh "mocha #{test_location}  --ui #{test_format} --recursive --reporter #{reporter} --timeout 15000"	
end

def rake_sh(command)
	sh command, @run_options
end

def log_user_into_session	
	sleep 0.3
	HTTParty.get('http://localhost:8008/logUserIntoSession')
end

