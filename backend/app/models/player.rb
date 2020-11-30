class Player < ApplicationRecord
    has_many :scores 
    has_many :games, through: :scores

end
