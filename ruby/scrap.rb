require 'rubygems'
require 'nokogiri'
require 'open-uri'

# url = "http://www.walmart.com/search/search-ng.do?search_constraint=0&ic=48_0&search_query=batman&Find.x=0&Find.y=0&Find=Find"
# doc = Nokogiri::HTML(open(url))
# puts doc.at_css("title").text
# doc.css(".item").each do |item|
#   title = item.at_css(".prodLink").text
#   price = item.at_css(".PriceCompare .BodyS, .PriceXLBold").text[/\$[0-9\.]+/]
#   puts "#{title} - #{price}"
#   puts item.at_css(".prodLink")[:href]
# end

# scrap reddit
# url = "http://www.reddit.com"
# doc = Nokogiri::HTML(open(url))
# puts doc.at_css("siteTable").text
# doc.css(".thing").each do |item|
#   title = item.at_css(".title").text
#   price = item.at_css(".byLink").text[/\$[0-9\.]+/]
#   puts "#{title} - #{price}"
#   puts item.at_css(".prodLink")[:href]
# end

#### Read Gov Website ####
# doc = Nokogiri::HTML(open('http://www.gov.hk/tc/residents/'))
# option = doc.css('.singleMenu')
 
# puts option

#### read prices of computer ####
doc = Nokogiri::HTML(open('http://www.price.com.hk/category.php?c=100023'))
doc.css(".item").each do |item|
	title = item.css('.line > a').text
	price = item.css('.text-price-number').text
	computer = "#{title} - $#{price}"
	puts computer
end

# write data into files
# my_local_filename = "computer-price.html"
# my_local_file = open(my_local_filename, "w")
#     my_local_file.write(computer)    
# my_local_file.close