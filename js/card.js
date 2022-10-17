export class Card {
    constructor(game = [], svgAssetsLoader, svgElement, row, column) {
        this.game = game;
        this.svgAssetsLoader = svgAssetsLoader;
        this.svgElement = svgElement;
        this.row = Number(row);
        this.column = Number(column);
        this.isFlipped = false;
        this.card;
    }

    createCard() {
        if (this.svgElement.cards !== 2) {
            // create a svg <<use>> element to duplicate the svg and add it to another div
            this.svgElement.element = this.svgAssetsLoader.duplicateSvg(this.svgElement.elementId);
        }
        const cardId = "back-card" + this.row + "-" + this.column;
        this.svgElement.element.setAttribute("id", cardId);

        // update the remaining cards to be added
        this.svgElement.cards--;
        this.svgElement.elementId = cardId;
        return this.getCard();
    }

    getCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", this.svgElement.color);
        card.appendChild(this.svgElement.element);
        card.setAttribute(
            "style",
            "grid-area:" + this.row + " / " + this.column + " / " + this.row + " / " + this.column
        );
        card.setAttribute("grid-column", this.column + " / span 1");
        card.setAttribute("grid-row", this.row + " / span 1");
        this.addOnClickBtnEvent(card);
        const frontCard = this.getFrontCard();
        card.appendChild(frontCard);
        this.card = card;
        return card;
    }

    getFrontCard() {
        let frontCard = document.createElement("div");
        frontCard.classList.add("frontCard");

        return frontCard;
    }

    addOnClickBtnEvent(card) {
        var playing = false;
        card.addEventListener("click", () => {
            if (playing) return;
            playing = true;
            this.flipCard(card, () => (playing = false));
        });
    }

    flipCard(card, onComplete) {
        if (this.isFlipped) return;
        this.isFlipped = true;
        const onCompleteAnimation = () => {
            onComplete.call(null);
            this.game.checkFlippedCard(this, card.id);
        };
        this.animateCard(card, onCompleteAnimation);
    }

    animateCard(card, onComplete) {
        anime({
            targets: card,
            scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 200 }],
            rotateY: { value: "+=180", delay: 200 },
            easing: "easeInOutSine",
            duration: 400,
            complete: onComplete,
        });
    }

    flipCardBack() {
        this.animateCard(this.card, () => {
            this.isFlipped = false;
        });
    }
}
