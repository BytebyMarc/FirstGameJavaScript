"use strict";
import Field from './Field.js';
import Player from './Player.js';
import Neighbors from './Neighbors.js';
import EventManager from './events/EventManager.js';
import {enableArrowKeys, disableArrowKeys} from './events/keyHandler.js';
import {mouseClickHandler, mousePositionEvent} from './events/mouseEvent.js';
import GameDependencies from './GameDependencies.js';
import Statusbar from './statusbar.js';
import Items from "./Items.js";
import Data from './Dataloader/Data.js';


export const GameDep = new GameDependencies(16);
export let player = new Player(GameDep);
export let field = new Field(GameDep);
export let neighbors = new Neighbors(GameDep);
export const eventManager = new EventManager();
let statusBar = new Statusbar(GameDep);
export let items = new Items(GameDep);

let data = new Data()

let  overlay = document.getElementById('overlay');
GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
document.addEventListener('keydown', (event) => {
    eventManager.emit(event.key);
});

function runJS(){
    GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
    field.draw()
    player.draw()
    items.draw();
    statusBar.draw(player.lifePoints)
    overlay.style.display = 'none';
    if(GameDep.gameStatus === 1) {
        if(!GameDep.questTriggered) {
         GameDep.takeQuest = data.getQuest()

        }
        items.findBook(GameDep.takeQuest)
        GameDep.questTriggered = true;
    }
if(player.lifePoints < 1) {
    GameOver()
    clearInterval(intervalId);

}
}
    enableArrowKeys()
GameDep.canvas.onmousedown = mouseClickHandler
GameDep.canvas.onmousemove = mousePositionEvent;

let intervalId = setInterval(runJS, 100);


function GameOver(){
    GameDep.ctx.fillStyle = 'white';
    GameDep.ctx.fillRect(200, 200, 250, 200);
    GameDep.ctx.fillStyle = "#000";
    GameDep.ctx.font = "16px Arial";
    GameDep.ctx.fillText(`GAMEOVER`, 250, 280);
    GameDep.ctx.fillText(`New Game - Press F5 `, 250, 240);

}