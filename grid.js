"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const mousePosDisplay = document.getElementById('mousePos');


let howManyBoxes = 4
let fieldSizeX = canvas.width / howManyBoxes;
let fieldSizeY = fieldSizeX

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
            arrayGrid[i][j] = {ID: id, gridX: gridX, gridY: gridY, color: 1};
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
                if(arrayGrid[x][y].color == 1) {
                    arrayGrid[x][y].color = 2
                } else{
                    arrayGrid[x][y].color = 1
                }
            }
            outerLoop:
                for(let i = 0; i < howManyBoxes;i++){
                    for(let j = 0; j < howManyBoxes;j++) {


                        if (canvas.height - fieldSizeX < mouseClickX && arrayGrid[i][j].gridY > mouseClickY){
                           setColor(i-1, arrayGrid.length -1)
                           break outerLoop;
                        }
                        if (canvas.width - fieldSizeX < mouseClickX && canvas.height - fieldSizeY < mouseClickY){
                            setColor( arrayGrid.length-1,  arrayGrid.length-1)
                            break outerLoop;
                        }
                        if (arrayGrid[i][j].gridX > mouseClickX && canvas.height - fieldSizeY < mouseClickY){
                            setColor( arrayGrid.length-1, j-1)
                            break outerLoop;
                        }
                        if(arrayGrid[i][j].gridX > mouseClickX && arrayGrid[i][j].gridY > mouseClickY){
                            setColor(i-1, j-1)
                            break outerLoop;
                        }
                    }
                }
}

function draw() {
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
            ctx.lineWidth = 1;
            ctx.fillRect(arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, fieldSizeX, fieldSizeY);
            ctx.strokeRect(arrayGrid[i][j].gridX, arrayGrid[i][j].gridY, fieldSizeX, fieldSizeY);
            ctx.stroke();
        }
    }
}
function runJS(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw()
}

canvas.onmousedown = mouseClickHandler
canvas.onmousemove = mousePositionEvent;

setInterval(runJS, 300);