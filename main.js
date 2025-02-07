"use strict";
import {enableKeysStartMenu} from "./events/keyHandler.js";
import {saveGame} from "./GameDataObjekts/SaveGame.js"
import {GameDep, field, player, items, enemy, question,attack, statusBar, setNewGame, drawStartMenu} from "./GameDataObjekts/LoadGame.js";

// Spiel start mit SpielMenü
if(GameDep.gameStart === true){
    enableKeysStartMenu()
    GameDep.selectedStartMenu = 0;
    GameDep.intervalId = setInterval(drawStartMenu, 100);
}

export function runJS(){
    //newGame
    if(GameDep.selectedStartMenu === 9){
        setNewGame()
    }
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


