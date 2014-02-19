class FakeNpmModules
	require 'fileutils'

	def initialize(packages_list,location)
		@packages_list = packages_list
		@location = location
	end

	def copy
		node_modules_location = './node_modules'
		
		 @packages_list.each do | name_of_module |
			FileUtils.cp_r "#{node_modules_location}/#{name_of_module}", "#{@location}/node_modules/#{name_of_module}"
			FileUtils.rm_rf "#{@location}/node_modules/#{name_of_module}/node_modules"
		 end
	end


	def delete
		node_modules_location = './node_modules'
		@packages_list.each do | name_of_module |
			FileUtils.rm_rf "#{@location}/node_modules/#{name_of_module}"
		 end
	end
end