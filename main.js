"use strict";
import GameDependencies from './GameDependencies.js';
import Player from './Player.js';
import Field from './Field.js';
import Neighbors from './Neighbors.js';
import Items from "./Items.js";
import Attack from "./Attack.js";
import Enemy from "./Enemy.js"
import Question from "./Question.js";
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
export let attack = new Attack(GameDep, player);
export let enemy = new Enemy(GameDep);
export let data = new Data();
export let question = new Question(data);
export const eventManager = new EventManager();
let statusBar = new Statusbar(GameDep);

GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
GameDep.container.addEventListener('click', (event) => {question.checkAnswer(event); });
document.addEventListener('keydown', (event) => { eventManager.emit(event.key); });
enableArrowKeys();
GameDep.canvas.onmousedown = mouseClickHandler;
GameDep.canvas.onmousemove = mousePositionEvent;
GameDep.intervalId = setInterval(runJS, 100);



export function runJS(){
    GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
    field.draw();
    player.draw();
    items.drawBook();
    enemy.drawEnemy();
    statusBar.draw(player.lifePoints);
    question.openWindowsQuestion();
    attack.openWindowAttack(enemy.enemyList[0]);
    if(player.lifePoints < 1) {
        //disableArrowKeys()
        GameDep.GameOver();
    }
}
