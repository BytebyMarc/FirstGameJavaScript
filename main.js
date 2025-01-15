"use strict";

import Field from './Field.js';
import Player from './Player.js';
import Neighbors from './Neighbors.js';
import EventManager from './EventManager.js';
import {arrowKeyHandlers} from './keyboardEvent.js';


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const mousePosDisplay = document.getElementById('mousePos');
let howManyBoxes = 16
let fieldSizeX = canvas.width / howManyBoxes;
let fieldSizeY = fieldSizeX;



export let player = new Player(fieldSizeX, fieldSizeY, ctx);
export let field = new Field(howManyBoxes, fieldSizeX, fieldSizeY, ctx);
export let neighbors = new Neighbors(howManyBoxes, fieldSizeX, fieldSizeY);

const eventManager = new EventManager()


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

function enableArrowKeys(){
    Object.keys(arrowKeyHandlers).forEach(key => {
        eventManager.on(key, arrowKeyHandlers[key]);
    })

}



document.addEventListener('keydown', (event) => {
    eventManager.emit(event.key);
});

enableArrowKeys()
function runJS(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.draw()
    player.draw()
}

canvas.onmousedown = mouseClickHandler
canvas.onmousemove = mousePositionEvent;

setInterval(runJS, 100);