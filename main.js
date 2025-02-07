"use strict";
import Player from './Player.js';
import Field from './Field.js';
import Items from "./Items.js";
import Enemy from "./Enemy.js"
import {enableKeysStartMenu, disableKeysStartMenu} from "./events/keyHandler.js";
import {mouseClickHandler, mousePositionEvent} from './events/mouseEvent.js';
import {saveGame} from "./SaveGame.js"
import {GameDep, field, player, items, enemy, question,eventManager, attack} from "./LoadGame.js";
import {statusBar} from "./LoadGame.js"

GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
GameDep.container.addEventListener('click', (event) => {question.checkAnswer(event); });
document.addEventListener('keydown', (event) => { eventManager.emit(event.key, event); });
GameDep.canvas.onmousedown = mouseClickHandler;
GameDep.canvas.onmousemove = mousePositionEvent;


if(GameDep.gameStart === true){
    enableKeysStartMenu()
    GameDep.selectedStartMenu = 0;
    GameDep.intervalId = setInterval(drawStartMenu, 100);
}

export function runJS(){
    //newGame
    if(GameDep.selectedStartMenu === 9){
        GameDep.selectedStartMenu = 8
        field = null
        player = null
        items = null
        enemy = null
        field = new Field(GameDep);
        player = new Player(GameDep);
        items = new Items(GameDep);

        enemy = new Enemy(GameDep);

    }
    GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);

    field.draw();
    player.draw();
    items.drawBook();
    enemy.drawEnemy();
    player.drawItemBag()
    statusBar.draw(player.lifePoints, player.maxLifePoints, player.experiencePoints , player.experiencePointsNextLevel);
    player.drawLevel(player.playerLevel)
    question.openWindowsQuestion();
    attack.openWindowAttack();
    if(player.lifePoints < 1) {
        //disableArrowKeys()
        GameDep.GameOver();
        player.lifePoints = 10;
    }
    saveGame(GameDep, player, arrayGrid, items.itemList, attack, enemy);
}



function drawStartMenu() {
    const menuMargin = 30;
    const menuWidth = 400 - 2 * menuMargin; // 700px Breite
    const menuHeight = 100; // Erhöhte Höhe für vertikales Layout
    const menuX = 240;
    const menuY = 340;
    const optionHeight = menuHeight / 2; // Höhe für jede Menüoption

    // Hintergrund des Menüs (abgerundeter Kasten)

    function startMenu (ctx, x, y, width, height, radius){
        ctx.fillStyle = "#fff";

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();

        }

    startMenu(GameDep.ctx, menuX, menuY, menuWidth, menuHeight, 10);

    // Rahmen um das Menü
    GameDep.ctx.lineWidth = 3;
    GameDep.ctx.strokeStyle = "#fff";
    GameDep.ctx.stroke();

    // Menüoptionen: "Item" und "Attacken"
    const options = ["Spiel Laden", "Neues Spiel"];
    GameDep.ctx.font = "bold 24px Arial";
    GameDep.ctx.textBaseline = "middle";

    // Zeichne die einzelnen Menüoptionen übereinander
    for (let i = 0; i < options.length; i++) {
        let optionY = menuY + i * optionHeight;
        let optionCenterX = menuX + menuWidth / 2;
        let optionCenterY = optionY + optionHeight / 2;

        // Wenn diese Option ausgewählt ist, wird ein halbtransparentes Highlight gezeichnet
        if (GameDep.selectedStartMenu === i) {
            GameDep.ctx.save();
            GameDep.ctx.fillStyle = "#123";

            GameDep.ctx.fillRect(menuX, optionY, menuWidth, optionHeight);
            GameDep.ctx.restore();
            GameDep.ctx.fillStyle = "#ff"; // Ausgewählte Option in Weiß
        } else {
            GameDep.ctx.fillStyle = "#000"; // Unausgewählte Optionen in Hellgrau
        }

        // Text zentrieren
        const text = options[i];
        const textWidth = GameDep.ctx.measureText(text).width;
        GameDep.ctx.fillText(text, optionCenterX - textWidth / 2, optionCenterY);
    }

    GameDep.ctx.restore();
}