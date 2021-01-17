require 'resolv'

class Visit < ApplicationRecord
  belongs_to :link

  validates :ip, presence: true, format: { with: Resolv::IPv4::Regex }
end
