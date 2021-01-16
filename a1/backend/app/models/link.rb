class Link < ApplicationRecord
  belongs_to :user

  validates_presence_of :url
  validates_uniqueness_of :short_code
  validates :url, format: URI::regexp(%w[http https])
  validates_presence_of :clicks

  before_create :generate_short_code
  CHARSET = [*'a'..'z', *'A'..'Z', *'0'..'9']

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
