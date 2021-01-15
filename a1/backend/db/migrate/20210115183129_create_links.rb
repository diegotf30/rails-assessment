class CreateLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :links do |t|
      t.string :url, null: false, default: ""
      t.string :short_code, null: false, unique: true
      t.integer :clicks, default: 0
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
