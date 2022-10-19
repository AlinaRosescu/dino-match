/**
 * includes logic for individual cards
 */
export class Card {
    constructor(game = [], svgAssetsLoader, svgElement, row, column) {
        this.game = game;
        this.svgAssetsLoader = svgAssetsLoader;
        this.svgElement = svgElement;
        this.row = Number(row);
        this.column = Number(column);
        this.isFlipped = false;
        this.isEnabled = false;
        this.card;
    }

    /**
     * add the svg image and the div to hold it
     * @returns {HTMLDivElement}
     */
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
        card.style.gridArea = `${this.column} / ${this.row} / ${this.column + 1} / ${this.row + 1}`;
        this.card = card;
        this.addOnClickBtnEvent(card);
        const frontCard = this.getFrontCard();
        card.appendChild(frontCard);

        return card;
    }

    /**
     * create a div with a full background color that will hide the svg image
     * @returns {HTMLDivElement}
     */
    getFrontCard() {
        let frontCard = document.createElement("div");
        frontCard.classList.add("frontCard");

        return frontCard;
    }

    /**
     * add click event for the div holding the 2 card faces
     * @param card
     */
    addOnClickBtnEvent(card) {
        var playing = false;
        this.isEnabled = true;
        card.addEventListener("click", this.onClickEvent.bind(this, playing));
    }

    onClickEvent(playing) {
        if (playing || !this.isEnabled) return;
        playing = true;
        this.flipCard(this.card, () => (playing = false));
    }

    /**
     * animate the card to show the svg image to the user
     * @param card
     * @param onComplete
     */
    flipCard(card, onComplete) {
        if (this.isFlipped) return;
        this.isFlipped = true;
        const onCompleteAnimation = () => {
            onComplete.call(null);
            this.game.checkFlippedCard(this, card.id);
        };
        this.animateCard(card, onCompleteAnimation);
    }

    /**
     * Flip animation
     * @param card
     * @param onComplete
     */
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

    /**
     * flip the card back to show the full background div
     */
    flipCardBack() {
        this.animateCard(this.card, () => {
            this.isFlipped = false;
        });
    }

    disableClick() {
        this.isEnabled = false;
    }
}
