require 'rubygems'
require 'mechanize'
load 'state_machine.rb'
load 'subjects.rb'

def extract_data(link)
	subj_page = link.click.link_with(:text => 'Comisiones').click
	data = subj_page.css('div.tab-panel')[0].css('span')
	print "#{data[0].text} - #{data[1].text}\n"
end

def visit_list(link, visited_list_pages)
	page = link.click
	page.links_with(:text => 'Detalles').each do |link|
		Thread.new{ extract_data(link) }		
	end
	page.links.find_all { |l| /^[0-9]+$/.match(l.text) }.each do |link|
		if (!visited_list_pages.include? link.text.to_i)
			visited_list_pages << link.text.to_i
			visit_list(link, visited_list_pages)
		end
	end
end

def investigate(link, subjects)
	page = link.click.links_with(:text => 'Detalles')[3].click.link_with(:text => 'Comisiones').click
	subj_title = subj_page.css('div.tab-panel')[0].css('span')
	dt = DataExtractor.new(Subject.new(subj_title[0], subj_title[1]))
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
end	

def login(user_data)
	agent = Mechanize.new
	page = agent.get('http://sga.itba.edu.ar/')
	login_form = page.form()
	login_form.user = user_data[0]
	login_form.password = user_data[1]
	login_form.js = 1
	return login_form.submit
end


visited_list_pages = []
subjects = []

if(ARGV.size < 2)
	puts "Usuario y contrasena de SGA no ingresados"
	exit
end
page = login(ARGV)
first_list_link = page.links.find { |l| l.text == 'Cursos' }
visited_list_pages << 1
#visit_list(first_list_link, visited_list_pages)
investigate(first_list_link, subjects)