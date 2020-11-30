class GameSerializer < ActiveModel::Serializer
  attributes :id
  has_many :scores 
  has_many :players, through: :scores
end
