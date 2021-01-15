class Link < ApplicationRecord
  belongs_to :user

  validates_presence_of :url
  validates_uniqueness_of :short_code
  validates :url, format: URI::regexp(%w[http https])

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

    code = ''
    while true do
      code = CHARSET.sample(length).join
      break if Link.find_by_short_code(code).nil?
    end
    self.short_code = code
  end
end
