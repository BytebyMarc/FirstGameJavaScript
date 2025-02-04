import {attack, GameDep, runJS, enemy, player, items} from "../main.js";
import {disableAttackKeyHandlers, enableArrowKeys} from "./keyHandler.js";

export {attackKeyHandlers};
const attackKeyHandlers = {
    Escape: () =>{
        GameDep.setGameStatus(0)
    },
    Enter: () =>{
        if (attack.selectedMenuIndex === 0) {
            attack.selectedMenuIndex = 4 // attackmenu
        }
        if (attack.selectedMenuIndex === 1){
            attack.selectedMenuIndex = 5 // item menu
        }

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
        if(attack.enemy.hitpoint <= 0){
            const index = enemy.enemyList.findIndex(enemy => enemy.ID === attack.enemy.id);
            enemy.enemyList.splice(index, 1);
            if(items.itemList.length < 5)
            {
                items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
                items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
                items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            }
            disableAttackKeyHandlers()
            enableArrowKeys()
            GameDep.setGameStatus(0)
            clearInterval(GameDep.intervalId);
            GameDep.intervalId = setInterval(runJS, 100);
            attack.selectedMenuIndex = 0
            attack.selectedAttackIndex =  undefined
            enemy.dropEnemy(GameDep.randomID(), "MAGIER", 150, 15,20,10,
                "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
        }

        if(attack.switchMenu === "Attack"){
            enemy.enemyList[0].hitpoint = enemy.enemyList[0].hitpoint - player.attack1Hit
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


function selectMenu(key){
        if (attack.selectedMenuIndex === 0 && attack.selectedMenuIndex < 2) {
            attack.selectedMenuIndex = 1; // 0: "Item", 1: "Attacken"
        }
        if (attack.selectedMenuIndex === 1 && attack.selectedMenuIndex < 2) {
            attack.selectedMenuIndex = 0;
        }
    if(attack.selectedMenuIndex === 4 && key.key === "ArrowUp")
    {
        attack.selectedAttackIndex = (attack.selectedAttackIndex - 1 + 4) % 4;
    }
    if(attack.selectedMenuIndex === 4 && key.key === "ArrowDown")
    {
        attack.selectedAttackIndex = (attack.selectedAttackIndex + 1) % 4;
    }

}