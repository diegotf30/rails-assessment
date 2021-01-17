FactoryBot.define do
    factory :link do
      url  { Faker::Internet.url }
      short_code { Faker::Alphanumeric.alpha(number: 3) }
      clicks { 0 }
      user { create :user }

      transient do
        amount { 3 }
      end

      trait :with_recurrent_visits do
        after(:create) do |link, evaluator|
          create_list :visit,
                      evaluator.amount,
                      link: link,
                      visits: 2
        end
      end
  end
end
