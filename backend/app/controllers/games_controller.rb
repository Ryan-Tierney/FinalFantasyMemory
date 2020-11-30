class GamesController < ApplicationController 

    def index 
        games = Game.all 
        render json: games 
    end 

    def create 
        game = Game.create
        render json: game 
    end 

    def update 
        game = Game.update 
        render json: game 
    end 

    def show 
        game = Game.find(params[:id])
        render json: game 
    end 

end 