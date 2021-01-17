# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: 'a', email: 'a@gmail.com', password: 'test123', password_confirmation: 'test123')

Link.create(url: 'http://hola.com', user: User.first)
Link.create(url: 'http://google.com', user: User.first)