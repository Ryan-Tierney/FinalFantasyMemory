class AudioController { 
    constructor() {
        this.bgMusic = new Audio('Assets/audio/ff-battle-music.mp3');
        this.goMusic = new Audio('Assets/audio/game-over-FF.mp3');
        this.victoryMusic = new Audio('Assets/audio/final-fantasy-vii-victory-fanfare-1.mp3');
        this.flipSound = new Audio('Assets/audio/Card-flip-sound-effect.mp3');
        this.matchSound = new Audio('Assets/audio/kingdom_hearts_noize.mp3');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true; 
    }
    startMusic() {
        this.stopVictoryMusic();
        this.stopGameOverMusic();
        this.bgMusic.play();
    }

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    stopVictoryMusic() { 
        this.victoryMusic.pause();
        this.victoryMusic.currentTime = 0;
    }

    stopGameOverMusic() {
        this.goMusic.pause();
        this.goMusic.currentTime = 0;
    }

    flip() {
        this.flipSound.play()
    }

    match() {
        this.matchSound.play()
    }

    gameOver() {
        this.stopMusic(); 
        this.goMusic.play();
    }

    victory() {
        this.stopMusic();
        this.victoryMusic.play();
    }

}

class FFMemories { 
    constructor(totalTime, cards) { 
        this.cardsArray = cards; 
        this.totalTime = totalTime; 
        this.timeRemaining = totalTime; 
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips'); 
        this.audioController = new AudioController();
    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0; 
        this.timeRemaining = this.totalTime; 
        this.matchedCards = []; 
        this.busy = true; 

        setTimeout(() => { 
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining; 
        this.ticker.innerText = this.totalClicks; 
        
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible'); 
            card.classList.remove('matched');
        });
    }
    
    flipCard(card) { 
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++; 
            this.ticker.innerText = this.totalClicks; 
            card.classList.add('visible');

            if(this.cardToCheck) 
                this.checkForCardMatch(card);
            else 
                this.cardToCheck = card; 
        }
    }

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.misMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match()
        if(this.matchedCards.length === this.cardsArray.length)
        this.victory();
    }

    misMatch(card1, card2) { 
        this.busy = true; 
        setTimeout(() => { 
            card1.classList.remove('visible');
            card2.classList.remove('visible'); 
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('FFCharacter')[0].src;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--; 
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver(); 
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() { 
        clearInterval(this.countDown);
        this.audioController.victory(); 
        document.getElementById('victory-text').classList.add('visible');
    }

    shuffleCards() { 
        for(let i = this.cardsArray.length -1; i > 0; i--) { 
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;

        }
    }
    canFlipCard(card) { 
         return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() { 
    let overlays = Array.from(document.getElementsByClassName('overlay-text')); 
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new FFMemories(50, cards)

    overlays.forEach(overlay => { 
        overlay.addEventListener('click', () => { 
            overlay.classList.remove('visible'); 
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); 
} else {
    ready(); 
} 
