"use strict";
import Field from './Field.js';
import Player from './Player.js';
import Neighbors from './Neighbors.js';
import EventManager from './events/EventManager.js';
import {enableArrowKeys, disableArrowKeys} from './events/keyHandler.js';
import {mouseClickHandler, mousePositionEvent} from './events/mouseEvent.js';
import GameDependencies from './GameDependencies.js';

const canvas = document.getElementById("myCanvas");
const mousePosDisplay = document.getElementById('mousePos');


export const GameDep = new GameDependencies(canvas, 16);
export let player = new Player(GameDep);
export let field = new Field(GameDep);
export let neighbors = new Neighbors(GameDep);
export const eventManager = new EventManager()

canvas.addEventListener('mousemove', mousePositionEvent(canvas, mousePosDisplay));
canvas.addEventListener('click', mouseClickHandler(player, GameDep));
document.addEventListener('keydown', (event) => {
    eventManager.emit(event.key);
});


function runJS(){
    GameDep.ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.draw()
    player.draw()
}

enableArrowKeys()
canvas.onmousedown = mouseClickHandler
canvas.onmousemove = mousePositionEvent;

setInterval(runJS, 100);