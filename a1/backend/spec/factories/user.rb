FactoryBot.define do
    factory :user do
      name  { Faker::Name.name }
      email { Faker::Internet.email }
      password { 'foobar123' }
      password_confirmation { 'foobar123' }
      created_at { Time.current }
  end
end
