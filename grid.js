"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const mousePosDisplay = document.getElementById('mousePos');
let howManyBoxes = 10
let fieldSizeX = canvas.width / howManyBoxes;
let fieldSizeY = fieldSizeX;

class Field{
    constructor() {
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

        tileImages.GRASS.src = 'grass.png';
        tileImages.WATER.src = 'water.png';
        tileImages.FOREST.src = 'forrest.png';
        tileImages.MOUNTAIN.src = 'mountain.png';
        ctx.beginPath();
        ctx.moveTo(0, 0)
        for (let i = 0; i < howManyBoxes; i++) {
            for (let j = 0; j < howManyBoxes; j++) {
                if(arrayGrid[i][j].color === 1){
                    ctx.fillStyle = 'white';
                }
                if (arrayGrid[i][j].color === 2){
                    ctx.fillStyle = 'blue';
                }
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 0;
                let img = tileImages[arrayGrid[i][j].art]
                if (img.complete) {
                    ctx.drawImage(img, arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, fieldSizeX, fieldSizeY);
                }else {
                    ctx.fillRect(arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, fieldSizeX, fieldSizeY);
                }
                // ctx.strokeRect(arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, fieldSizeX, fieldSizeY);
                ctx.stroke();
            }
        }
    }
}

//##################################################################################
//##################################################################################
//##################################################################################

class player1 {
    constructor() {
        this.name = "Marc"
        this.currentField = 1
        this.lastPositionID = 0
    }
    move(direction, setLastPositionID) {
        switch (direction) {
            case "up":
                this.lastPositionID = setLastPositionID;
                break;
            case "down":
                this.lastPositionID = setLastPositionID;
                break;
            case "left":
                this.lastPositionID = setLastPositionID;
                break;
            case "right":
                this.lastPositionID = setLastPositionID;
                break;
        }
    }
    setLastPositionID(fieldID){
        this.lastPositionID = fieldID;
    }
    getLastPositionID(){
        return this.lastPositionID;
    }
    canMove(direction) {
        //move is possible
    }
    draw() {
        const result = arrayGrid.flat().find(cell => cell.ID === this.lastPositionID);
        ctx.fillStyle = 'red';
        ctx.fillRect(result.gridX, result.gridY, fieldSizeX, fieldSizeY);
        console.log("last posistion:" + this.lastPositionID)
    }
}


function mousePositionEvent(){
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        mousePosDisplay.textContent = `${mouseX.toFixed(0)}, ${mouseY.toFixed(0)}`;
})}

function mouseClickHandler(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseClickX = event.clientX - rect.left;
            const mouseClickY = event.clientY - rect.top;
            function setColor(x, y){
                //console.log(`${x}, ${y}`);
                ctx.fillRect(arrayGrid[x][y].gridX, arrayGrid[x][y].gridY, fieldSizeX, fieldSizeX);
                if(arrayGrid[x][y].color === 1) {
                    arrayGrid[x][y].color = 2
                } else{
                    arrayGrid[x][y].color = 1
                }
            }
            outerLoop:
                for(let i = 0; i < howManyBoxes;i++){
                    for(let j = 0; j < howManyBoxes;j++) {

                        // Vertikale Überprüfung letze Reihe
                        if (canvas.height - fieldSizeX < mouseClickX && arrayGrid[i][j].gridY > mouseClickY){
                           setColor(i-1, arrayGrid.length -1)
                            player.setLastPositionID(arrayGrid[i-1][arrayGrid.length -1].ID)
                           //console.log("vertical");
                           break outerLoop;
                        }
                        // Rechte untere Ecke
                        if (canvas.width - fieldSizeX < mouseClickX && canvas.height - fieldSizeY < mouseClickY){
                            setColor( arrayGrid.length-1,  arrayGrid.length-1)
                            player.setLastPositionID(arrayGrid[howManyBoxes-1][howManyBoxes-1].ID)
                            //console.log("Unten ecke");
                            break outerLoop;
                        }
                        // Horizontale Überprüfung letzte reihe
                        if (arrayGrid[i][j].gridX > mouseClickX && canvas.height - fieldSizeY < mouseClickY){
                            setColor( arrayGrid.length-1, j-1)
                            player.setLastPositionID(arrayGrid[arrayGrid.length-1][j-1].ID)
                            //console.log("Horizonte");
                            break outerLoop;
                        }
                        // alle bis auf die letzten reihen
                        if(arrayGrid[i][j].gridX > mouseClickX && arrayGrid[i][j].gridY > mouseClickY){
                            setColor(i-1, j-1)
                            player.setLastPositionID(arrayGrid[i-1][j-1].ID)
                            //console.log("rest");
                            break outerLoop;
                        }
                    }
                }
}

class Neighbors{
        calculate(fieldID){
            let north = fieldID - howManyBoxes
            let south = fieldID + howManyBoxes
            let west = fieldID - 1
            let east = fieldID + 1

            if (fieldID < howManyBoxes) {
                north = null
            }
            for (let i = 0; i < howManyBoxes; i++) {
                if (fieldID === howManyBoxes * i) {
                    west = null
                }
            }
            for (let i = 0; i < howManyBoxes; i++) {
                if (fieldID === howManyBoxes * i - 1) {
                    east = null
                }
            }
            if (fieldID === howManyBoxes * howManyBoxes - 1) {
                south = null
                east = null
            }
            if (fieldID >= howManyBoxes * howManyBoxes - howManyBoxes) {
                south = null
            }
            this.north = north;
            this.south = south;
            this.west = west;
            this.east = east;
            console.log("FieldID: " + fieldID+ " North: " + north + " South: " + south + " West: " +west+  " East: " + east);
        }
        getSouth(fieldID)
        {
            this.calculate(fieldID)
            return this.south;
        }
        getNorth(fieldID){
            this.calculate(fieldID)
            return this.north;
        }
        getWest(fieldID){
            this.calculate(fieldID)
            return this.west;
        }
        getEast(fieldID){
            this.calculate(fieldID)
            return this.east;
        }

}

let player = new player1()
let field = new Field
let neighbors = new Neighbors()
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        player.move("up", neighbors.getNorth(player.getLastPositionID()));
    } else if (event.key === "ArrowDown") {
        player.move("down", neighbors.getSouth(player.getLastPositionID()));
    } else if (event.key === "ArrowLeft") {
        player.move("left", neighbors.getWest(player.getLastPositionID()));
    } else if (event.key === "ArrowRight") {
        player.move("right", neighbors.getEast(player.getLastPositionID()));
    }
});
function runJS(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.draw()
    player.draw()
}

canvas.onmousedown = mouseClickHandler
canvas.onmousemove = mousePositionEvent;

setInterval(runJS, 300);