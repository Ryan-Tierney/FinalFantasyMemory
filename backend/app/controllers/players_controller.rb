class PlayersController < ApplicationController
before_action :find_player, only: [:show, :update]
    def index 
        players = Player.all
        render json: players
    end 

    def create 
        player = Player.create(player_params)
        render json: player 
    end 

    def update 
        @player.update(player_params)
        render json: @player 
    end 

    def show 
        render json: @player 
    end 

    private 

    def player_params 
        params.permit(:username)
    end 

    def find_player 
        @player = Player.create(player_params)
    end 

end
