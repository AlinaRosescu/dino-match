import Utils from "./utils.js";

/**
 * includes logic for loading and adding svg elements
 */
export class SvgAssetsLoader {
    constructor(assetsArray) {
        this.assetsArray = assetsArray;
        this.svgElements = [];
    }

    /**
     * load all the svg elements
     * @returns {Promise<void>}
     */
    async loadAssets() {
        for (let i = 0; i < this.assetsArray.length; i++) {
            let svgElement = {};
            svgElement.name = this.assetsArray[i];
            svgElement.data = await this.fetchData(svgElement.name);
            this.svgElements.push(svgElement);
        }
    }

    /**
     * get svg image data
     * @param svgName
     * @returns {Promise<string>}
     */
    async fetchData(svgName) {
        const response = await fetch("assets/" + svgName + ".svg");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.text();
    }

    /**
     * create inline svg element and set it's color
     * @param color
     * @returns {SVGSVGElement}
     */
    getSvgElement(color) {
        let randomSvg = this.getRandomSvgAsset();
        let parser = new DOMParser();
        let svgDoc = parser.parseFromString(randomSvg.data, "image/svg+xml");

        let svgElement;
        svgElement = svgDoc.getElementsByTagName("svg")[0];
        svgElement.setAttribute("fill", color);

        return svgElement;
    }

    /**
     * create an object for each svg element to be added and its variables
     * @param colors
     * @returns {*[]}
     */
    createSvgElements(colors) {
        let result = [];
        for (let i = 0; i < colors.length; i++) {
            let svgElement = {
                element: this.getSvgElement(colors[i]),
                color: colors[i],
                cards: 2,
            };
            result.push(svgElement);
        }
        return result;
    }

    /**
     * create svg <<use>> element
     * @param elementId
     * @returns {SVGSVGElement}
     */
    duplicateSvg(elementId) {
        var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useElem.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + elementId);
        svgElem.appendChild(useElem);

        return svgElem;
    }

    /**
     * get random svg asset
     * @returns {*}
     */
    getRandomSvgAsset() {
        const index = Utils.getRandomIndex(this.svgElements);
        return this.svgElements[index];
    }
}
