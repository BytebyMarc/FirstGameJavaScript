
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
        this.questTriggered = false;
        this.gameStatus = 0;
            // 0 = Normaler Modus
            // 1 = Fragenfenster ist geöffnet
            // 2 =
            // 3 = Antwort wird geprüft // enter setzt auch den status 3
            // 4 = KAMPFARENA
            // 5 = Dungeon
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
            CITY: new Image(),
            MAGIER: new Image(),
            ZAUBERER: new Image(),
            MONSTER: new Image(),

        };

        this.tileImages.DRAGON.src = 'assets/dragon.png';
        this.tileImages.BOOK.src = 'assets/Book.png';
        this.tileImages.MAGIER.src = 'assets/magier.png';
        this.tileImages.GRASS.src = 'assets/grass.png';
        this.tileImages.WATER.src = 'assets/water.png';
        this.tileImages.FOREST.src = 'assets/forrest.png';
        this.tileImages.MOUNTAIN.src = 'assets/mountain.png';
        this.tileImages.ZAUBERER.src = 'assets/zauberer.png';
        this.tileImages.MONSTER.src = 'assets/monster1.png';
    }
    randomID() {
        let random = Math.floor(Math.random() * this.howManyBoxes * this.howManyBoxes);
        let run = 0
        let one = 0
        let two = 0
        let three = 0
        let four = 0

        while (run === 0) {
            if (random <= this.howManyBoxes) {
                random = Math.floor(Math.random() * this.howManyBoxes * this.howManyBoxes);
                one = 0
                two = 0
                three = 0
                four = 0
            } else {
                one = 1
            }
            if (random > ((this.howManyBoxes * this.howManyBoxes)-16)) {
                random = Math.floor(Math.random() * this.howManyBoxes * this.howManyBoxes);
                one = 0
                two = 0
                three = 0
                four = 0
            } else {
                 two = 2
            }

            if (random % this.howManyBoxes === 0) {
                random = Math.floor(Math.random() * this.howManyBoxes * this.howManyBoxes);
                one = 0
                two = 0
                three = 0
                four = 0
            } else {
                three = 3
                }

            if ((random+1) % this.howManyBoxes === 0) {
                random = Math.floor(Math.random() * this.howManyBoxes * this.howManyBoxes);
                one = 0
                two = 0
                three = 0
                four = 0
            }else {four = 4 }

                if (one === 1 && two === 2 && three === 3 && four === 4) {
                    return random;
                }
        }
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