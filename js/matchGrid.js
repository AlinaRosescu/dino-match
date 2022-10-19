import Utils from "./utils.js";
import { Card } from "./card.js";
import { Timer } from "./timer.js";
import { Game } from "./game.js";

/**
 * includes the grid logic and its variables
 */
export class MatchGrid {
    constructor(svgAssetsLoader = {}, gameContainer = {}, rows = 4, columns = 4, colors = [], timeLimit = 2) {
        this.game = new Game(rows + columns, this);
        this.columns = columns;
        this.rows = rows;
        this.colors = colors;
        this.svgAssetsLoader = svgAssetsLoader;
        this.gameContainer = gameContainer;
        this.svgElements = svgAssetsLoader.createSvgElements(this.colors);
        var minutes = 60 * timeLimit,
            display = document.querySelector("#time");
        this.timer = new Timer(minutes, display, this.game);
        this.cards = [];
    }

    /**
     * add the cards
     */
    createGrid() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                //get a random svg to create the card
                const randomIndex = Utils.getRandomIndex(this.svgElements);
                let randomSvgElement = this.svgElements[randomIndex];
                let cardObj = new Card(this.game, this.svgAssetsLoader, randomSvgElement, i, j);
                let card = cardObj.createCard();
                this.cards.push(cardObj);
                this.gameContainer.appendChild(card);

                if (randomSvgElement.cards === 0) {
                    this.svgElements.splice(randomIndex, 1);
                }
            }
        }
        this.timer.startTimer();
        this.addOnMouseOutGameEvent();
        this.addOnMouseOverGameEvent();
    }

    addOnMouseOverGameEvent() {
        this.gameContainer.addEventListener("mouseover", () => {
            this.timer.resumeTimer();
        });
    }

    addOnMouseOutGameEvent() {
        this.gameContainer.addEventListener("mouseout", () => {
            this.timer.pauseTimer();
        });
    }

    /**
     * game end, disable cards
     */
    endGrid() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].disableClick();
        }
    }
}
