class Subject
	attr_accessor :name, :code, :plans
	def initialize(code, name)
		@name, @code = name, code
		@plans = []
	end
	def add_plan(plan)
		@plans << plan
	end
end

class Plan
	attr_accessor :name, :classes
	def initialize(name)
		@name = name
		@classes = []
	end
	def add_class(cla)
		@classes << cla
	end
end

class Class
	attr_accessor :day, :start, :finish
	def initialize(day)
		@day= day
	end
end