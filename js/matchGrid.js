import Utils from "./utils.js";
import { Card } from "./card.js";
import { Timer } from './timer.js';

export class MatchGrid {
    constructor(
        game = [],
        svgAssetsLoader = {},
        gameContainer = {},
        rows = 4,
        columns = 4,
        colors = [],
        timeLimit = 2
    ) {
        this.game = game;
        this.columns = columns;
        this.rows = rows;
        this.colors = colors;
        this.svgAssetsLoader = svgAssetsLoader;
        this.gameContainer = gameContainer;
        this.svgElements = svgAssetsLoader.createSvgElements(this.colors);
        var minutes = 60 * timeLimit,
            display = document.querySelector('#time');
        this.timer = new Timer(minutes, display);
    }

    createGrid() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                //get a random svg to create the card
                const randomIndex = Utils.getRandomIndex(this.svgElements);
                let randomSvgElement = this.svgElements[randomIndex];
                let cardObj = new Card(this.game, this.svgAssetsLoader, randomSvgElement, i, j);
                let card = cardObj.createCard();
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
            this.timer.resumeTimer()
        });
    }

    addOnMouseOutGameEvent() {
        this.gameContainer.addEventListener("mouseout", () => {
            this.timer.pauseTimer()
        });
    }
}
