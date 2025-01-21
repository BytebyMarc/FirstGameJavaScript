export default class GameDependencies {
    constructor(howManyBoxes) {
        this.canvas = document.getElementById("myCanvas");
        this.container = document.querySelector('.overlay');
        this.howManyBoxes = howManyBoxes;
        this.fieldSizeX = this.canvas.width / this.howManyBoxes;
        this.fieldSizeY = this.fieldSizeX;
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.gameStatus = 0;
        this.questTriggered = false;
        this.intervalId = "";
        this.takeQuest = []

        this.tileImages = {
            DRAGON: new Image(),
            BOOK: new Image(),
            GRASS: new Image(),
            WATER: new Image(),
            FOREST: new Image(),
            MOUNTAIN: new Image(),
            CITY: new Image()
        };

        this.tileImages.DRAGON.src = 'assets/dragon.png';
        this.tileImages.BOOK.src = 'assets/Book.png';
        this.tileImages.GRASS.src = 'assets/grass.png';
        this.tileImages.WATER.src = 'assets/water.png';
        this.tileImages.FOREST.src = 'assets/forrest.png';
        this.tileImages.MOUNTAIN.src = 'assets/mountain.png';
    }
    randomID()
    {
        return this.random = Math.floor(Math.random() * this.howManyBoxes * this.howManyBoxes);
    }
    setGameStatus(status)
    {
        this.gameStatus = status;
    }
    GameOver(){
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(200, 200, 250, 200);
        this.ctx.fillStyle = "#000";
        this.ctx.font = "16px Arial";
        this.ctx.fillText(`GAMEOVER`, 250, 280);
        this.ctx.fillText(`New Game - Press F5 `, 250, 240);
        clearInterval(this.intervalId);
    }
}