"use strict";
import Field from './Field.js';
import Player from './Player.js';
import Neighbors from './Neighbors.js';
import EventManager from './events/EventManager.js';
import {enableArrowKeys, disableArrowKeys} from './events/keyHandler.js';
import {mouseClickHandler, mousePositionEvent} from './events/mouseEvent.js';
import GameDependencies from './GameDependencies.js';
import Statusbar from './statusbar.js';


export const GameDep = new GameDependencies(16);
export let player = new Player(GameDep);
export let field = new Field(GameDep);
export let neighbors = new Neighbors(GameDep);
export const eventManager = new EventManager();
let statusBar = new Statusbar(GameDep);


GameDep.canvas.addEventListener('mousemove', mousePositionEvent(GameDep.canvas, GameDep.mousePosDisplay));
GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
document.addEventListener('keydown', (event) => {
    eventManager.emit(event.key);
});


function runJS(){
    GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
    field.draw()
    player.draw()
    statusBar.draw(player.lifePoints)
}

enableArrowKeys()
GameDep.canvas.onmousedown = mouseClickHandler
GameDep.canvas.onmousemove = mousePositionEvent;

setInterval(runJS, 100);