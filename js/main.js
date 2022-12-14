import { SvgAssetsLoader } from "./svgAssetsLoader.js";
import Utils from "./utils.js";
import { MatchGrid } from "./matchGrid.js";

function init() {
    const rows = 4;
    const columns = 4;
    const svgAssetsNames = ["ankylosaurus", "ornithopod", "stegosaurus", "tyrannosaurus"];
    const svgAssetsLoader = new SvgAssetsLoader(svgAssetsNames);

    const gameContainer = document.getElementById("gameContainer");
    gameContainer.style.setProperty("--grid-rows", rows);
    gameContainer.style.setProperty("--grid-cols", columns);

    const colors = Utils.generateHslaColors(100, 40, rows + columns);
    const button = document.querySelector("#startBtn");
    // load svg assets and add grid

    svgAssetsLoader
        .loadAssets()
        .then((response) => (new MatchGrid(svgAssetsLoader, gameContainer, rows, columns, colors, 2)))
        .then((grid) => {
            button.addEventListener("click", () => {
                button.setAttribute("disabled", "");
                grid.createGrid();
            });
        });
}
// wait for the HTML to load
document.addEventListener("DOMContentLoaded", init);
