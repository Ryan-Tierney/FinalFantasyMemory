class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :scores 
  has_many :games, through: :scores
end
