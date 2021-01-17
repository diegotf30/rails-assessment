FactoryBot.define do
    factory :visit do
      ip { Faker::Internet.ip_v4_address }
      os { Faker::Lorem.word }
      browser { Faker::Lorem.word }
      platform { Faker::Lorem.word }
      mobile { false }
      visits { 1 }

      trait :recurrent do
        visits { 2 }
      end
  end
end
