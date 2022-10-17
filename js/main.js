import { SvgAssetsLoader } from "./svgAssetsLoader.js";
import Utils from "./utils.js";
import { MatchGrid } from "./matchGrid.js";
import { Game } from "./game.js";

function init() {
    const rows = 4;
    const columns = 4;
    const svgAssetsNames = ["ankylosaurus", "ornithopod", "stegosaurus", "tyrannosaurus"];
    const svgAssetsLoader = new SvgAssetsLoader(svgAssetsNames);

    const gameContainer = document.getElementById("gameContainer");
    gameContainer.style.setProperty("--grid-rows", rows);
    gameContainer.style.setProperty("--grid-cols", columns);

    const game = new Game();


    const colors = Utils.generateHslaColors(100, 40, rows + columns);

    let grid;
    svgAssetsLoader
        .loadAssets()
        .then((response) => (grid = new MatchGrid(game, svgAssetsLoader, gameContainer, rows, columns, colors, 2)));

    const button = document.querySelector("#startBtn");
    button.addEventListener("click", onStartBtnClickEvent);

    function onStartBtnClickEvent() {
        button.setAttribute("disabled", "");
        grid.createGrid();
    }
}
// wait for the HTML to load
document.addEventListener("DOMContentLoaded", init);