class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :links

  validates_presence_of :name
  validates_uniqueness_of :email
end
