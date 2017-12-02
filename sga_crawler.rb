require 'rubygems'
require 'mechanize'



def extract_data(link)
	subj_page = link.click.link_with(:text => 'Comisiones').click
	data = subj_page.css('div.tab-panel')[0].css('span')
	print "#{data[0].text} - #{data[1].text}\n"
end

def visit_list(link, visited_list_pages)
	threads = []
	page = link.click
	page.links_with(:text => 'Detalles').each do |link|
		threads << Thread.new{ extract_data(link) }
	end
	page.links.find_all { |l| /^[0-9]+$/.match(l.text) }.each do |link|
		if (!visited_list_pages.include? link.text.to_i)
			visited_list_pages << link.text.to_i
			visit_list(link, visited_list_pages)
		end
	end
	threads.each{|t| t.join}
end


visited_list_pages = []

agent = Mechanize.new
page = agent.get('http://sga.itba.edu.ar/')
login_form = page.form()
login_form.user = 'afratoni'
login_form.password = ARGV[0]
login_form.js = 1
page = login_form.submit
first_list_link = page.links.find { |l| l.text == 'Cursos' }
visited_list_pages << 0
visit_list(first_list_link, visited_list_pages)
