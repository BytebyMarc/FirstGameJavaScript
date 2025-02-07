import {runJS} from "../main.js";
import {GameDep, player, items, enemy, attack} from "../LoadGame.js";
import {disableAttackKeyHandlers, enableArrowKeys} from "./keyHandler.js";

export {attackKeyHandlers};
const attackKeyHandlers = {
    Escape: (key) =>{
        selectMenu(key)
    },
    Enter: () =>{

        if(attack.selectedMenuIndex === 4){
        if(attack.enemy.hitpoint >= 0) {

            switch (attack.selectedAttackIndex) {
                case 0:
                    attack.enemy.hitpoint = attack.enemy.hitpoint - player.attack1Hit

                    break;
                case 1:
                    attack.enemy.hitpoint = attack.enemy.hitpoint - player.attack2Hit
                    break;
                case 2:
                    attack.enemy.hitpoint = attack.enemy.hitpoint - player.attack2Hit
                    break;
                case 3:
                    attack.enemy.hitpoint = attack.enemy.hitpoint - player.attack2Hit
                    break;
                default:
                    console.log(attack.selectedAttackIndex)
                    break;
            }
            }
        }
        if(attack.selectedMenuIndex === 5){
            // Item menü was passiert hier ?
            let index = attack.selectedItemIndex
            player.bag.splice(index, 1);

        }
        if (attack.selectedMenuIndex === 0) {
            attack.selectedMenuIndex = 4; // Attacken-Menü aktivieren
            attack.selectedAttackIndex = 0;
        }
        if (attack.selectedMenuIndex === 1) {
            attack.selectedMenuIndex = 5; // Item-Menü aktivieren
        }


        if(attack.enemy.hitpoint <= 0){
            const index = enemy.enemyList.findIndex(enemy => enemy.ID === attack.enemy.ID);
            enemy.enemyList.splice(index, 1);
            if(items.itemList.length < 5)
            {
                items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
                items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
                items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            }
            player.levelCalculator(15)
            disableAttackKeyHandlers()
            enableArrowKeys()
            GameDep.setGameStatus(0)
            clearInterval(GameDep.intervalId);
            GameDep.intervalId = setInterval(runJS, 100);
            attack.selectedMenuIndex = 0
            attack.selectedAttackIndex =  undefined
            delete attack.enemyImage
            enemy.dropEnemy(GameDep.randomID(), "MAGIER", 150, 15,20,10,
                "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
        }

        if(attack.switchMenu === "Attack"){
            attack.enemy.hitpoint = attack.enemy.hitpoint - player.attack1Hit
            console.log(attack.selectedAttackIndex)
        }

    },
    ArrowUp: (key) => {
        selectMenu(key)
    },
    ArrowDown: (key) => {
        selectMenu(key)
    }
}


function selectMenu(key) {
    if (attack.selectedMenuIndex < 2) {
        if (key.key === "ArrowUp") {
            attack.selectedMenuIndex = (attack.selectedMenuIndex - 1 + 2) % 2;
        }
        if (key.key === "ArrowDown") {
            attack.selectedMenuIndex = (attack.selectedMenuIndex + 1) % 2;
        }
    }

    if (attack.selectedMenuIndex === 4) {
        if (key.key === "ArrowUp") {
            attack.selectedAttackIndex = (attack.selectedAttackIndex - 1 + 4) % 4;
        }
        if (key.key === "ArrowDown") {
            attack.selectedAttackIndex = (attack.selectedAttackIndex + 1) % 4;
        }
        if (key.key === "Escape") {
            attack.selectedMenuIndex = 0;
        }
    }

    if (attack.selectedMenuIndex === 5) {
        if (key.key === "ArrowUp") {
            attack.selectedItemIndex = (attack.selectedItemIndex - 1 + player.bag.length) % player.bag.length;
        }
        if (key.key === "ArrowDown") {
            attack.selectedItemIndex = (attack.selectedItemIndex + 1) % player.bag.length;
        }
        if (key.key === "Escape") {
            attack.selectedMenuIndex = 0;
        }
    }
}




