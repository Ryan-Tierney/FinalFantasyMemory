class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :time_remaining 
      t.integer :cards_flipped 
      t.integer :game_id 
      t.integer :player_id
      t.timestamps
    end
  end
end
