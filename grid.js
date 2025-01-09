"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let gridX = 0;
let gridY = 0;

ctx.beginPath();
ctx.moveTo(0, 0)
let arrayGrid = Array.from({ length: 10 }, () => Array(10).fill(0));
let randomTen = [];
    for (let k = 0; k <= 10;k++)
    {
        randomTen.push(Math.floor(Math.random()*1001));
    }

for(let i = 0; i < 10;i++){
    gridX = 0
    for(let j = 0; j < 10 ;j++){
        ctx.rect(gridX, gridY , 100, 100);
        arrayGrid[i][j] = {gridX: gridX, gridY: gridY};
        gridX += 100
    }
    gridY += 100
}

ctx.moveTo(0, 0)
for (let k= 0; k < 10;k++) {
    ctx.lineTo(k*100+100, randomTen[k])
    console.log(k*100)
}
ctx.stroke();



//  if(i % 2 != 0) {
//      if (j % 2 == 0) {
//          ctx.fillStyle = "white";
//      } else {
//          ctx.fillStyle = "black";
//      }
//  }else
//  {
//      if (j % 2 == 0) {
//          ctx.fillStyle = "black";
//      } else {
//          ctx.fillStyle = "white";
//      }
// }