require 'rubygems'
require 'mechanize'
load 'state_machine.rb'
load 'subjects.rb'

# Recive una lista de materias y las persiste en un archivo en forma de texto.
def save_data(subject_list)
	File.open('data','w') do |file| 		
		subject_list.each do |subj|
			file.write("#{subj.code}|#{subj.name}\n")
			subj.plans.each do |plan|
				file.write("#{plan.name}\n")
				plan.classes.each do |cla|
					file.write("#{cla.day}\n#{cla.start}\n#{cla.finish}\n")
				end
			end
		end
	end
end

# Busca un archivo en donde materias fueron persistidas previamente y las recupera.
def recover_data()
	subjects = []
	dt = nil
	File.open('data', 'r') do |file|
		file.each_line do |line|
			next if line.nil?
			if(/^[0-9]+\.[0-9]+/.match(line))
				code,name = line.strip.split('|')
				subj = Subject.new(code,name)
				subjects << subj
				dt = DataExtractor.new(subj)
			elsif(/^[A-Z]+$/.match(line))
				dt.handle_event(:comision, line.strip)
			elsif(/(Lunes|Martes|Miercoles|Jueves|Viernes|Sabado|Domingo)/.match(line))
				dt.handle_event(:dia, line.strip)
			elsif(/^[0-9]+:[0-9]+$/.match(line))
				dt.handle_event(:hora, line.strip)
			end
		end
	end
	return subjects
end

# Recive la url de una materia, analiza su html y extrae el contenido necesario para
# crear un objeto Subject con titulo, codigo, comisiones y horario de cada una.
def extract_data(link)
	page = link.click.link_with(:text => 'Comisiones').click
	subj_title = page.css('div.tab-panel')[0].css('span')
	print "#{subj_title[0].text} - #{subj_title[1].text}\n"
	dt = DataExtractor.new(Subject.new(subj_title[0].text, subj_title[1].text))
	begin
		page.css('div.tab-panel')[0].xpath("//text()").each do |tag|
			txt = tag.text.strip
			if(/^[A-Z]+$/.match(txt))
				dt.handle_event(:comision, txt)
			end
			if(/(Lunes|Martes|Miercoles|Jueves|Viernes|Sabado|Domingo)/.match(txt))
				dt.handle_event(:dia, txt)
			end
			if(/^[0-9]+:[0-9]+$/.match(txt))
				dt.handle_event(:hora, txt)
			end
		end
		return dt.subject
	rescue
		return Subject.new(subj_title[0].text, subj_title[1].text)
	end
end

# Recive la url de una pagina del listado de materias y por cada materia en la
# lista pasa su url a extract_data(). Luego pasa recursivamente a otras paginas
# del listado.
def visit_list(link, visited_list_pages, subjects)
	threads = []
	page = link.click
	page.links_with(:text => 'Detalles').each do |link|
		threads << Thread.new do
			begin
				subjects << extract_data(link)
			rescue
				puts "Una materia fallo"		
			end
		end
	end
	page.links.find_all { |l| /^[0-9]+$/.match(l.text) }.each do |link|
		if (!visited_list_pages.include? link.text.to_i)
			visited_list_pages << link.text.to_i
			visit_list(link, visited_list_pages, subjects)
		end
	end
	threads.each{|t| t.join}
end

# Completa el formulario para loggearse en SGA usando un usuario y contrasena
def login(user_data)
	agent = Mechanize.new
	page = agent.get('http://sga.itba.edu.ar/')
	login_form = page.form()
	login_form.user = user_data[0]
	login_form.password = user_data[1]
	login_form.js = 1
	return login_form.submit
end

# Extrae la informacion necesaria de SGA para crear una lista de materias con sus horarios.
def scrap_sga(user_data)
	subjects = []
	visited_list_pages = []
	page = login(user_data)
	first_list_link = page.links.find { |l| l.text == 'Cursos' }
	visited_list_pages << 1
	visit_list(first_list_link, visited_list_pages, subjects)
	save_data(subjects)
	return subjects
end

subjects = []

if(ARGV.size < 2)
	puts "Usuario y contrasena de SGA no ingresados"
	exit
end
case ARGV[2]
	when "scrap"
		subjects = scrap_sga(user_data)
	when "recover"		
		subjects = recover_data()
	else
		puts "Ingrese 'scrap' o 'recover' para buscar informacion en sga o en la base de datos respectivamente"
		exit
end
puts subjects.size