class Link < ApplicationRecord
  belongs_to :user
  has_many :visits, dependent: :delete_all

  validates_presence_of :url
  validates_uniqueness_of :short_code
  validates :url, format: URI::regexp(%w[http https])

  before_create :generate_short_code
  CHARSET = [*'a'..'z', *'A'..'Z', *'0'..'9']

  def unique_visitors
    visits.count
  end

  def recurrent_visitors
    visits.where('visits > 1').count
  end

  private

  def generate_short_code
    return unless self.short_code.nil?

    length = 3
    links_count = Link.count(:all)
    # Ensure a unique code can be generated for current length
    while CHARSET.length ** length <= links_count  do
      length += 1
    end

    while true do
      self.short_code = CHARSET.sample(length).join
      break if self.valid?
    end
  end
end
