export class Game {
    constructor() {
        this.flippedCards = [];
        this.flippedCardsIds = [];
    }

    addFlippedCard(card, cardId) {
        this.flippedCards.push(card);
        this.flippedCardsIds.push(cardId);
    }

    checkFlippedCard(card, cardId) {
        let isMatch = this.flippedCardsIds.includes(cardId) && this.flippedCards.length > 0;

        if (isMatch) {
            this.removeFlippedCards();
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
}
