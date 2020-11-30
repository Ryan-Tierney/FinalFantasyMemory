class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :time_remaining, :cards_flipped, :player_id, :game_id
  belongs_to :game 
  belongs_to :player
end


