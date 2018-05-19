require 'json'
load 'state_machine.rb'
load 'subjects.rb'

dt = DataExtractor.new(Subject.new(18.23, 'Introduccion a la vida'))
while (line = gets)
  line = line.strip
  dt.handle_event(:comision, line) if /^[A-Z]+$/.match(line)
  if /(Lunes|Martes|Miercoles|Jueves|Viernes|Sabado|Domingo)/.match(line)
    dt.handle_event(:dia, line)
  end
  dt.handle_event(:hora, line) if /^[0-9]+:[0-9]+$/.match(line)
end

subject = dt.subject
print "#{subject.code} - #{subject.name}\n"
subject.plans.each do |plan|
  print "Comision #{plan.name}\n"
  plan.classes.each do |cla|
    print "#{cla.day} desde #{cla.start} hasta #{cla.finish}\n"
  end
end

puts subject.to_json
