load 'state_machine.rb'
load 'subjects.rb'

dt = DataExtractor.new(Subject.new(18.23, "Introduccion a la vida"))
while(line = gets)
	line = line.strip
	if(/^[A-Z]+$/.match(line))
		dt.handle_event(:comision, line)
	end
	if(/(Lunes|Martes|Miercoles|Jueves|Viernes|Sabado|Domingo)/.match(line))
		dt.handle_event(:dia, line)
	end
	if(/^[0-9]+:[0-9]+$/.match(line))
		dt.handle_event(:hora, line)
	end
end

subject = dt.subject
print "#{subject.code} - #{subject.name}\n"
subject.plans.each do |plan|
	print "Comision #{plan.name}\n"
	plan.classes.each do |cla|
		print "#{cla.day} desde #{cla.start} hasta #{cla.finish}\n"
	end
end
