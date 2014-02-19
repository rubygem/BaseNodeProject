# -*- encoding: utf-8 -*-
# stub: headless 1.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "headless"
  s.version = "1.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Leonid Shevtsov"]
  s.date = "2013-02-20"
  s.description = "    Headless is a Ruby interface for Xvfb. It allows you to create a headless display straight from Ruby code, hiding some low-level action.\n"
  s.email = "leonid@shevtsov.me"
  s.homepage = "http://leonid.shevtsov.me/en/headless"
  s.require_paths = ["lib"]
  s.requirements = ["Xvfb"]
  s.rubygems_version = "2.1.11"
  s.summary = "Ruby headless display interface"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rspec>, ["~> 2.6"])
    else
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rspec>, ["~> 2.6"])
    end
  else
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rspec>, ["~> 2.6"])
  end
end
