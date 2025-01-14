"use strict";

import Field from './Field.js';
import Player from './Player.js';
import Neighbors from './Neighbors.js';



const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const mousePosDisplay = document.getElementById('mousePos');
let howManyBoxes = 16
let fieldSizeX = canvas.width / howManyBoxes;
let fieldSizeY = fieldSizeX;



let player = new Player(fieldSizeX, fieldSizeY, ctx);
let field = new Field(howManyBoxes, fieldSizeX, fieldSizeY, ctx);
let neighbors = new Neighbors(howManyBoxes, fieldSizeX, fieldSizeY);

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
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        const resultNorth = arrayGrid.flat().find(cell => cell.ID === neighbors.getNorth(player.getLastPositionID()));
        if(player.getLastPositionID() <= 31 && player.getLastPositionID() >= 16)
        {
            if(resultNorth.art !== "MOUNTAIN") {
                field.generateNorth()
            }
        }else
        {
            if(resultNorth.art !== "MOUNTAIN") {player.move("up", neighbors.getNorth(player.getLastPositionID())); }
        }


        } else if (event.key === "ArrowDown") {
        const resultSouth = arrayGrid.flat().find(cell => cell.ID === neighbors.getSouth(player.getLastPositionID()));

        if(player.getLastPositionID() <= 239 && player.getLastPositionID() >= 224)
        {
            if(resultSouth.art !== "MOUNTAIN") {
                field.generateSouth()
            }
        }else
        {
            if(resultSouth.art !== "MOUNTAIN") {player.move("up", neighbors.getSouth(player.getLastPositionID())); }
        }


        } else if (event.key === "ArrowLeft") {
        const resultWest = arrayGrid.flat().find(cell => cell.ID === neighbors.getWest(player.getLastPositionID()));
        if(resultWest.art !== "MOUNTAIN") {player.move("down", neighbors.getWest(player.getLastPositionID())); }
        } else if (event.key === "ArrowRight") {
        const resultEast = arrayGrid.flat().find(cell => cell.ID === neighbors.getEast(player.getLastPositionID()));
        if(resultEast.art !== "MOUNTAIN") {player.move("down", neighbors.getEast(player.getLastPositionID())); }
        }
    });
function runJS(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.draw()
    player.draw()
}

canvas.onmousedown = mouseClickHandler
canvas.onmousemove = mousePositionEvent;

setInterval(runJS, 100);