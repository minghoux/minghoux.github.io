puts 'Hello, world!'
puts 9 + 6

# loop
for current_iteration_number in 1..10 do
   puts "Hello world, this is number #{current_iteration_number}"
end

# grid of number
for row_num in 1..9
   line = ""
   for col_num in 1..9
      line += "#{row_num * col_num}\t"
   end
   
   puts line
end

# ask for name and print it
# puts "Hello, what's your name?(hit Enter when done)"
# user_name = gets.chomp
# puts "Nice to meet you, #{user_name}!\n\n"


# read nytimes and save it as html
require "open-uri"
remote_base_url = "http://www.nytimes.com"
remote_page_name = ""
remote_full_url = remote_base_url + "/" + remote_page_name

somedata = open(remote_full_url).read

my_local_filename = "good-copy.html"
my_local_file = open(my_local_filename, "w")

    my_local_file.write(somedata)    

my_local_file.close