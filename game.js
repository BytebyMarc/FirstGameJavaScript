"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";

let player = {
    x:50,
    y:50,
    size: 20,
    speed: 5,
    color: "blue"
}

let gegenstand = {
    x: 100,
    y: 100,
    size: 30,
    speed: 2,
    direction: 1,
    color: "red"
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}
function drawGegenstand() {
    ctx.fillStyle = gegenstand.color;
    ctx.fillRect(gegenstand.x, gegenstand.y, gegenstand.size, gegenstand.size);
}

function moveGegenstand () {
    gegenstand.x += gegenstand.speed * gegenstand.direction;
    if(gegenstand.x + gegenstand.size > canvas.width || gegenstand.x < 0){
        gegenstand.direction *= -1;
    }
}

function movePlayer(direction) {
    switch (direction) {
        case "up":
            player.y = Math.max(0, player.y - player.speed);
            break;
        case "down":
            player.y = Math.min(canvas.height - player.size, player.y + player.speed)
            break;
        case "left":
            player.x = Math.max(0, player.x - player.speed);
            break;
        case "right":
            player.x = Math.min(canvas.width - player.size, player.x + player.speed);
            break;
    }
}

function drawAll(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawGegenstand();
}
function updateGame(){
    moveGegenstand();
    drawAll();
}


    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp") {
            movePlayer("up")
        } else if (event.key === "ArrowDown") {
            movePlayer("down")
        } else if (event.key === "ArrowLeft") {
            movePlayer("left")
        } else if (event.key === "ArrowRight") {
            movePlayer("right")
        }
    });

setInterval(updateGame, 30);
