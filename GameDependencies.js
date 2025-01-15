
export default class GameDependencies {
    constructor(howManyBoxes) {
        this.canvas = document.getElementById("myCanvas");
        this.mousePosDisplay = document.getElementById("mousePos");
        this.howManyBoxes = howManyBoxes;
        this.fieldSizeX = this.canvas.width / this.howManyBoxes;
        this.fieldSizeY = this.fieldSizeX;
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;


    }
}