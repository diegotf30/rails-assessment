require 'spec_helper'

RSpec.describe Visit, type: :model do
    it { is_expected.to respond_to :ip }
    it { is_expected.to respond_to :os }
    it { is_expected.to respond_to :browser }
    it { is_expected.to respond_to :platform }
    it { is_expected.to respond_to :mobile }


    it { is_expected.to validate_presence_of(:ip) }

    context "associations" do
      it { is_expected.to belong_to(:link) }
    end
end

