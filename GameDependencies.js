export default class GameDependencies {
    constructor(canvas, howManyBoxes) {
        this.canvas = canvas;
        this.howManyBoxes = howManyBoxes;
        this.fieldSizeX = canvas.width / howManyBoxes;
        this.fieldSizeY = this.fieldSizeX;
        this.ctx = canvas.getContext("2d");
        this.canvas = document.getElementById("myCanvas");
        this.mousePosDisplay = document.getElementById('mousePos');
    }
}