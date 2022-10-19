/**
 * keeps an account of flipped cards and matches
 */
export class Game {
    constructor(totalNumberOfMatches, grid) {
        this.flippedCards = [];
        this.flippedCardsIds = [];
        this.grid = grid;
        this.totalNumberOfMatches = totalNumberOfMatches;
        this.numberOfMatches = 0;
    }

    addFlippedCard(card, cardId) {
        this.flippedCards.push(card);
        this.flippedCardsIds.push(cardId);
    }

    /**
     * check if flipped card is a match
     * @param card
     * @param cardId
     */
    checkFlippedCard(card, cardId) {
        let isMatch = this.flippedCardsIds.includes(cardId) && this.flippedCards.length > 0;

        if (isMatch) {
            this.numberOfMatches++;
            this.removeFlippedCards();
            this.checkEndGame(this.grid.timer);
        } else {
            this.addFlippedCard(card, cardId);
            if (this.flippedCards.length === 2) {
                for (let i = 0; i < this.flippedCards.length; i++) {
                    this.flippedCards[i].flipCardBack();
                }
                this.removeFlippedCards();
            }
        }
    }

    removeFlippedCards() {
        this.flippedCards = [];
        this.flippedCardsIds = [];
    }

    /**
     * check if game is won or lost
     * @param timer
     */
    checkEndGame(timer) {
        if (this.numberOfMatches === this.totalNumberOfMatches) {
            document.getElementById("result").textContent = "You won!";
            timer.stopTimer();

            this.resetStartButton();
        } else {
            if (timer !== null && timer.timeIsOut) {
                if (this.flippedCards.length > 0) {
                    for (let i = 0; i < this.flippedCards.length; i++) {
                        this.flippedCards[i].flipCardBack();
                    }
                    this.removeFlippedCards();
                }
                this.grid.endGrid();
                document.getElementById("result").textContent = "You lost! :(";
                this.resetStartButton();
            }
        }
    }

    resetStartButton() {
        const button = document.querySelector("#startBtn");
        button.addEventListener("click", () => {
            button.setAttribute("disabled", "");
            this.grid.resetGrid();
            this.resetGame();
        }, true);
        button.removeAttribute("disabled", "");
        button.textContent = "Replay";
    }

    resetGame() {
        this.resetTimer();
        this.resetResultText();
    }
    resetTimer() {
        document.querySelector("#time").textContent = "";
    }

    resetResultText() {
        document.getElementById("result").textContent = "";
    }
}
