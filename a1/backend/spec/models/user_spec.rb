require 'spec_helper'

RSpec.describe User, type: :model do
    it { is_expected.to respond_to :name }
    it { is_expected.to respond_to :email }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }

    context "associations" do
      it { is_expected.to have_many(:links) }
    end
end

