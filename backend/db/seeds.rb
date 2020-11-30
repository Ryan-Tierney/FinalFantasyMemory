# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Game.create(id: 1) 
Player.create(username: 'SweetTea')
Score.create(time_remaining: 20, cards_flipped: 40, player_id: 1, game_id: 1)

Game.create(id: 2) 
Player.create(username: 'Mr.Kerley')
Score.create(time_remaining: 5, cards_flipped: 56, player_id: 2, game_id: 2)