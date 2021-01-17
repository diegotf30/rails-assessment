require 'spec_helper'

RSpec.describe Link, type: :model do
    it { is_expected.to respond_to :url }
    it { is_expected.to respond_to :short_code }
    it { is_expected.to respond_to :clicks }

    it { is_expected.to validate_presence_of(:url) }

    context 'associations' do
      it { is_expected.to belong_to(:user) }
      it { is_expected.to have_many(:visits) }
    end

    describe '#recurrent_visitors' do
        it 'should return visitors that have visited more than once' do
          user = create(:user)
          link = create :link, :with_recurrent_visits, user: user, amount: 3
          expect(link.recurrent_visitors.count).to eq 3
      end
    end

    describe '#recurrent_short_code' do
        it 'should generate a unique code' do
          link = create :link
          
          expect(link.short_code).not_to eq '' 
      end
    end
end

