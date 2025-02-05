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
import {saveGame} from "./SaveGame.js"
import Statusbar from './statusbar.js';
import Data from './Dataloader/Data.js';


let GameDepInstance
let GameDepParsed = localStorage.getItem("GameDep");
if(GameDepParsed){
    GameDepParsed = JSON.parse(GameDepParsed);
     GameDepInstance = new GameDependencies(16);
    Object.assign(GameDepInstance, GameDepParsed);
    }else{
        GameDepInstance = new GameDependencies(16);
    }

export let GameDep = GameDepInstance;
GameDep.canvas = document.getElementById("myCanvas");
GameDep.container = document.querySelector('.overlay');
GameDep.ctx = GameDep.canvas.getContext("2d");
GameDep.tileImages = {
    DRAGON: new Image(),
    BOOK: new Image(),
    GRASS: new Image(),
    WATER: new Image(),
    FOREST: new Image(),
    MOUNTAIN: new Image(),
    CITY: new Image(),
    MAGIER: new Image()
};
GameDep.tileImages.DRAGON.src = 'assets/dragon.png';
GameDep.tileImages.BOOK.src = 'assets/Book.png';
GameDep.tileImages.MAGIER.src = 'assets/magier.png';
GameDep.tileImages.GRASS.src = 'assets/grass.png';
GameDep.tileImages.WATER.src = 'assets/water.png';
GameDep.tileImages.FOREST.src = 'assets/forrest.png';
GameDep.tileImages.MOUNTAIN.src = 'assets/mountain.png';


let playerInstance
let playerParsed = localStorage.getItem("Player");
if(playerParsed){
    playerParsed = JSON.parse(playerParsed);
    playerInstance = new Player(GameDep);
    Object.assign(playerInstance, playerParsed)
    playerInstance.ctx = GameDep.canvas.getContext("2d");
    playerInstance.tileImages = GameDep.tileImages;
}else{
    playerInstance = new Player(GameDep);
}
export let player = playerInstance;

let fieldInstance
let fieldParsed = localStorage.getItem("FieldC");
if(fieldParsed){
    fieldParsed = JSON.parse(fieldParsed);
    fieldInstance = new Field(GameDep);
    fieldInstance.ctx = GameDep.canvas.getContext("2d");
    fieldInstance.tileImages = GameDep.tileImages;
} else {
    fieldInstance = new Field(GameDep);
}
export let field = fieldInstance;
arrayGrid = fieldParsed

export let neighbors = new Neighbors(GameDep);

let itemsInstance
let itemsParsed = localStorage.getItem("Item");
if(itemsParsed){
    itemsParsed = JSON.parse(itemsParsed);
    itemsInstance = new Items(GameDep);
    itemsInstance.itemList = itemsParsed
}else {
 itemsInstance = new Items(GameDep);
}
export let items = itemsInstance;
export let attack = new Attack(GameDep, player);
export let enemy = new Enemy(GameDep);


export let data = new Data();
export let question = new Question(data);
export const eventManager = new EventManager();
let statusBar = new Statusbar(GameDep);

GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
GameDep.container.addEventListener('click', (event) => {question.checkAnswer(event); });
document.addEventListener('keydown', (event) => { eventManager.emit(event.key, event); });
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
    statusBar.draw(player.lifePoints, player.maxLifePoints, player.experiencePoints , player.experiencePointsNextLevel);
    player.drawLevel(player.playerLevel)
    question.openWindowsQuestion();
    attack.openWindowAttack(enemy.enemyList[0]);
    if(player.lifePoints < 1) {
        //disableArrowKeys()
        GameDep.GameOver();
    }

    saveGame(GameDep, player, arrayGrid, items.itemList, attack, enemy);
}
