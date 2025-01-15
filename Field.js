export default class Field{
    constructor(howManyBoxes, fieldSizeX, fieldSizeY, ctx) {
        this.ctx = ctx
        this.fieldSizeX = fieldSizeX;
        this.fieldSizeY = fieldSizeY;
        this.howManyBoxes = howManyBoxes;
        if(typeof arrayGrid === 'undefined') {
            window.arrayGrid = Array.from({ length: howManyBoxes }, () => Array(howManyBoxes).fill(0));
            let gridX = 0;
            let gridY = 0;
            let id = 0
            for (let i = 0; i < howManyBoxes; i++)
            {
                gridX = 0
                for (let j = 0; j < howManyBoxes; j++)
                {
                    let art = 0
                    const rand = Math.random();
                    if (rand <= 0.1) art = "WATER";
                    else if (rand < 0.6) art= "GRASS";
                    else if (rand < 0.8) art = "FOREST";
                    else if (rand <= 0.9) art = "MOUNTAIN";
                    else art = "FOREST";


                    arrayGrid[i][j] = {ID: id, gridX: gridX, gridY: gridY, color: 1, art: art};
                    gridX += fieldSizeX
                    id++
                }
                gridY += fieldSizeY
            }
            console.log("Array wurde erzeugt")
            console.log(arrayGrid)
        }

        let randomTen = [];
        for (let k = 0; k <= 10;k++) {
            randomTen.push(Math.floor(Math.random() * fieldSizeX *11));
        }
    }
    draw() {
        const tileImages = {
            GRASS: new Image(),
            WATER: new Image(),
            FOREST: new Image(),
            MOUNTAIN: new Image(),
            CITY: new Image()
        };

        tileImages.GRASS.src = 'assets/grass.png';
        tileImages.WATER.src = 'assets/water.png';
        tileImages.FOREST.src = 'assets/forrest.png';
        tileImages.MOUNTAIN.src = 'assets/mountain.png';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0)
        for (let i = 0; i < this.howManyBoxes; i++) {
            for (let j = 0; j < this.howManyBoxes; j++) {
                if(arrayGrid[i][j].color === 1){
                    this.ctx.fillStyle = 'white';
                }
                if (arrayGrid[i][j].color === 2){
                    this.ctx.fillStyle = 'blue';
                }
                this.ctx.strokeStyle = 'black';
                this.ctx.lineWidth = 0;
                let img = tileImages[arrayGrid[i][j].art]
                if (img.complete) {
                    this.ctx.drawImage(img, arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, this.fieldSizeX, this.fieldSizeY);
                }else {
                    this.ctx.fillRect(arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, this.fieldSizeX, this.fieldSizeY);
                }
                // ctx.strokeRect(arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, fieldSizeX, fieldSizeY);
                this.ctx.stroke();
            }
        }
    }

    renewArray()
    { let id = 0
        let gridY = 0
        let gridX = 0
        let newID = 0
        for (let i = 0; i < this.howManyBoxes; i++) {
            gridX = 0
            for (let j = 0; j < this.howManyBoxes; j++) {
                arrayGrid[i][j].ID = newID;
                arrayGrid[i][j].gridX = gridX;
                arrayGrid[i][j].gridY = gridY;
                newID++
                gridX += this.fieldSizeX
            }
            gridY += this.fieldSizeY
        }
    }

    generateRow() {
        let newRow = []
        let id = 0
        let gridY = 0
        let gridX = 0
        for (let j = 0; j < this.howManyBoxes; j++) {
            let art = 0
            const rand = Math.random();
            if (rand <= 0.1) art = "WATER";
            else if (rand < 0.6) art = "GRASS";
            else if (rand < 0.8) art = "FOREST";
            else if (rand <= 0.9) art = "MOUNTAIN";
            else art = "FOREST";

            newRow[j] = {ID: id, gridX: gridX, gridY: gridY, color: 1, art: art};
            gridX += this.fieldSizeX
            id++

        }
    return newRow
    }

    generateNorth(){
        arrayGrid.pop();
        arrayGrid.unshift(this.generateRow())
        this.renewArray()
    }
    generateSouth(){
        arrayGrid.shift();
        arrayGrid.push(this.generateRow())
        this.renewArray()
    }
    generateWest(){

        this.renewArray()
    }
    generateEast(){

        this.renewArray()
    }
}