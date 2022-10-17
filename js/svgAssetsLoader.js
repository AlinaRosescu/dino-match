import Utils from "./utils.js";

export class SvgAssetsLoader {
    constructor(assetsArray) {
        this.assetsArray = assetsArray;
        this.svgElements = [];
    }

    async loadAssets() {
        for (let i = 0; i < this.assetsArray.length; i++) {
            let svgElement = {};
            svgElement.name = this.assetsArray[i];
            svgElement.data = await this.fetchData(svgElement.name);
            this.svgElements.push(svgElement);
        }
    }

    async fetchData(svgName) {
        const response = await fetch("/assets/" + svgName + ".svg");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.text();
    }

    getSvgElement(color) {
        let randomSvg = this.getSvgAsset();
        let parser = new DOMParser();
        let svgDoc = parser.parseFromString(randomSvg.data, "image/svg+xml");

        let svgElement;
        svgElement = svgDoc.getElementsByTagName("svg")[0];
        svgElement.setAttribute("fill", color);

        return svgElement;
    }

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

    duplicateSvg(elementId) {
        var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useElem.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + elementId);
        svgElem.appendChild(useElem);

        return svgElem;
    }

    getSvgAsset() {
        const index = Utils.getRandomIndex(this.svgElements);
        return this.svgElements[index];
    }
}
