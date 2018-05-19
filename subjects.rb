class Subject
  attr_accessor :name, :code, :plans
  def initialize(code, name)
    @name = name
    @code = code
    @plans = []
  end

  def add_plan(plan)
    @plans << plan
  end

  def as_json
    plans_json = []
    @plans.each do |plan|
      plans_json << plan.as_json
    end
    { 'subj_name' => @name, 'subj_code' => @code, 'plans' => plans_json }
  end

  def to_json
    as_json.to_json
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

  def as_json
    classes_json = []
    @classes.each do |cla|
      classes_json << cla.as_json
    end
    { 'plan_name' => @name, 'classes' => classes_json }
  end

  def to_json
    as_json.to_json
  end
end

class Class
  attr_accessor :day, :start, :finish
  def initialize(day)
    @day = day
  end

  def as_json
    { 'day' => @day, 'start' => @start, 'finish' => @finish }
  end

  def to_json
    as_json.to_json
  end
end
