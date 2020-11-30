class ScoresController < ApplicationController
before_action :find_score, only: [:show, :update]
    def index 
        scores = Score.all 
        render json: scores
    end 

    def create 
        score = Score.create
        render json: score
    end 

    def update 
        @score.update(scores_params)
        render json: @score 
    end 

    def show 
        render json: @score 
    end 

    private 

    def scores_params 
        params.permit(:time_remaining, :cards_flipped, :player_id, :game_id)
    end 

    def find_score 
        @score = Score.create(scores_params)
    end 
end
