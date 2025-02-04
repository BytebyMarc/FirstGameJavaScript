export default class Field{
    constructor(GameDep) {
        this.ctx = GameDep.ctx
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.howManyBoxes = GameDep.howManyBoxes;
        this.tileImages = GameDep.tileImages;

        if(typeof arrayGrid === 'undefined') {
            window.arrayGrid = Array.from({ length: this.howManyBoxes }, () => Array(this.howManyBoxes).fill(0));
            let gridX = 0;
            let gridY = 0;
            let id = 0
            for (let i = 0; i < this.howManyBoxes; i++)
            {
                gridX = 0
                for (let j = 0; j < this.howManyBoxes; j++)
                {
                    let art = 0
                    const rand = Math.random();
                    if (rand <= 0.1) art = "WATER";
                    else if (rand < 0.6) art= "GRASS";
                    else if (rand < 0.8) art = "FOREST";
                    else if (rand <= 0.9) art = "MOUNTAIN";
                    else art = "FOREST";


                    arrayGrid[i][j] = {ID: id, gridX: gridX, gridY: gridY, color: 1, art: art};
                    gridX += this.fieldSizeX
                    id++
                }
                gridY += this.fieldSizeY
            }
            console.log("Array wurde erzeugt")
            console.log(arrayGrid)
        }

        let randomTen = [];
        for (let k = 0; k <= 10;k++) {
            randomTen.push(Math.floor(Math.random() * this.fieldSizeX *11));
        }
    }
    draw() {
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
                let img = this.tileImages[arrayGrid[i][j].art]
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

    generateCols() {
        let newCol = []

            let art = 0
            const rand = Math.random();
            if (rand <= 0.1) art = "WATER";
            else if (rand < 0.6) art = "GRASS";
            else if (rand < 0.8) art = "FOREST";
            else if (rand <= 0.9) art = "MOUNTAIN";
            else art = "FOREST";
            newCol = {ID: 0, gridX: 0, gridY: 0, color: 1, art: art};
        return newCol
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

        arrayGrid.forEach(array => array.splice(this.howManyBoxes,1));
        arrayGrid.forEach(array => array.splice(0,0, this.generateCols()));
        this.renewArray()
    }
    generateEast(){
        arrayGrid.forEach(array => array.splice(0,1));
        arrayGrid.forEach(array => array.splice(this.howManyBoxes-1,0, this.generateCols()));
        this.renewArray()
    }
    updateArtById(id, neuerWert) {
        const zeile = Math.floor(id / 16);
        const spalte = id % 16;
        arrayGrid[zeile][spalte].art = neuerWert;
    }
    getArtById(id) {
        const zeile = Math.floor(id / 16);
        const spalte = id % 16;
        return arrayGrid[zeile][spalte].art
    }
}