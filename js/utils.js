class Utils {
    static getRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    static generateHslaColors(saturation, lightness, amount) {
        let colors = [];
        let hueDelta = Math.trunc(360 / amount);

        for (let i = 0; i < amount; i++) {
            let hue = i * hueDelta;
            colors.push(`hsl(${hue},${saturation}%,${lightness}%)`);
        }

        return colors;
    }
}
export default Utils;
