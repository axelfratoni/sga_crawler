load 'subjects.rb'

class TransitionTable
  class TransitionError < RuntimeError
    def initialize(state, input)
      super "No transition from state #{state.inspect} for input #{input.inspect}"
    end
  end

  def initialize(transitions)
    @transitions = transitions
  end

  def call(state, input)
    @transitions.fetch([state, input])
  rescue KeyError
    raise TransitionError.new(state, input)
  end
end

class StateMachine
  def initialize(transition_function, initial_state)
    @transition_function = transition_function
    @state = initial_state
  end

  attr_reader :state

  def send_input(input)
    @state, output = @transition_function.call(@state, input)
    output
  end
end

class DataExtractor
  STATE_TRANSITIONS = TransitionTable.new(
    # State, Input          Next state, Output
	[:q0, :comision] 	=>	[:q1, :create_plan],
	[:q1, :dia] 		=> 	[:q2, :create_class],
	[:q2, :hora] 		=> 	[:q3, :append_start_hour],
	[:q3, :hora]		=>	[:q4, :append_finish_hour],
	[:q4, :dia]			=>	[:q2, :create_class],
	[:q4, :comision]	=>	[:q1, :create_plan]
  )
  attr_reader :subject

  def initialize(subject)
    @state_machine = StateMachine.new(STATE_TRANSITIONS, :q0)
    @subject = subject
  end

  def handle_event(event, data)
    action = @state_machine.send_input(event)
    send(action, data) unless action.nil?
  end

  def create_plan(name)
	@actual_plan = Plan.new(name)
	@subject.add_plan(@actual_plan)
  end

  def create_class(day)
	@actual_class = Class.new(day)
  end

  def append_start_hour(hour)
  	@actual_class.start = hour
  end

  def append_finish_hour(hour)
  	@actual_class.finish = hour
  	@actual_plan.add_class(@actual_class)
  end
end
