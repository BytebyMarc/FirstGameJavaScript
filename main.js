"use strict";
import GameDependencies from './GameDependencies.js';
import Items from "./Items.js";
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
export const eventManager = new EventManager();
let statusBar = new Statusbar(GameDep);
let data = new Data()


GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
GameDep.container.addEventListener('click', (event) => {
    if (event.target.classList.contains('answer')) {
        console.log(`Geklickt auf: ${event.target.id}`);}
        GameDep.setGameStatus(3)
        GameDep.questTriggered = false;
        overlay.style.display = 'none';
        GameDep.intervalId = setInterval(runJS, 100);

});
document.addEventListener('keydown', (event) => {
    eventManager.emit(event.key);
});


export function runJS(){
    GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
    field.draw()
    player.draw()
    items.draw();
    statusBar.draw(player.lifePoints)
    openWindowsQuestion();
    if(player.lifePoints < 1) {
        GameDep.GameOver()
    }
}

enableArrowKeys()
GameDep.canvas.onmousedown = mouseClickHandler
GameDep.canvas.onmousemove = mousePositionEvent;
GameDep.intervalId = setInterval(runJS, 100);



function openWindowsQuestion() {
    if (GameDep.gameStatus === 1) {
        if (!GameDep.questTriggered) {
            (async () => {
                try {
                    const dataa = await data.getQuest(); // Promise auflösen
                    const jsonString = JSON.stringify(dataa, null, 2); // JSON-String mit Formatierung
                    GameDep.takeQuest = jsonString
                } catch (error) {
                    console.error('Fehler:', error);
                }
            })();
        }
        items.findBook(GameDep.takeQuest)
        GameDep.questTriggered = true;
        clearInterval(GameDep.intervalId);
    }
}
