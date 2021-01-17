class CreateVisits < ActiveRecord::Migration[5.2]
  def change
    create_table :visits do |t|
      t.string :ip, unique: true, null: false
      t.string :os
      t.string :platform
      t.string :browser
      t.boolean :mobile
      t.integer :visits, default: 1
      t.belongs_to :link, foreign_key: true

      t.timestamps
    end
    add_index :visits, :ip, unique: true
  end
end
