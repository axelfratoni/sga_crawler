load 'subjects.rb'

# Tabla de transiciones usada en la maquina de estados.
class TransitionTable
  class TransitionError < RuntimeError
    def initialize(state, input)
      super "No transition from state #{state.inspect} for input #{input.inspect}"
    end
  end

  def initialize(transitions)
    @transitions = transitions
  end

  # Recive un estado y un input y transiciona al siguiente estado devolviendo la accion a ejecutar.
  def call(state, input)
    @transitions.fetch([state, input])
  rescue KeyError
    raise TransitionError.new(state, input)
  end
end

# Maquina de estados utilizada para analizar la informacion extraida de SGA
# y crear los objetos necesarios.
class StateMachine
  def initialize(transition_function, initial_state)
    @transition_function = transition_function
    @state = initial_state
  end

  attr_reader :state

  # Recive un input y realiza una transicion en la maquina de estados.
  def send_input(input)
    @state, output = @transition_function.call(@state, input)
    output
  end
end

# Haciendo uso de la maquina de estados, realiza acciones segun la transicion ocurrida.
# Recive un objeto Subject y lo completa con toda la informacion necesaria.
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
