"use strict";
import GameDependencies from './GameDependencies.js';
import Items from "./Items.js";
import Question from "./Question.js";
import Field from './Field.js';
import Player from './Player.js';
import Neighbors from './Neighbors.js';
import EventManager from './events/EventManager.js';
import {enableArrowKeys, disableArrowKeys} from './events/keyHandler.js';
import {mouseClickHandler, mousePositionEvent} from './events/mouseEvent.js';
import Statusbar from './statusbar.js';
import Data from './Dataloader/Data.js';

export const GameDep = new GameDependencies(16);
export let player = new Player(GameDep);
export let field = new Field(GameDep);
export let neighbors = new Neighbors(GameDep);
export let items = new Items(GameDep);
let data = new Data()
export let question = new Question(data);
export const eventManager = new EventManager();
let statusBar = new Statusbar(GameDep);

GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
GameDep.container.addEventListener('click', (event) => {question.checkAnswer(event); });
document.addEventListener('keydown', (event) => { eventManager.emit(event.key); });
GameDep.canvas.onmousedown = mouseClickHandler
GameDep.canvas.onmousemove = mousePositionEvent;
GameDep.intervalId = setInterval(runJS, 100);


export function runJS(){
    GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
    enableArrowKeys()
    field.draw()
    player.draw()
    //items.draw();
    statusBar.draw(player.lifePoints)
    question.openWindowsQuestion();
    if(player.lifePoints < 1) {
        //disableArrowKeys()
        GameDep.GameOver()
    }
}
