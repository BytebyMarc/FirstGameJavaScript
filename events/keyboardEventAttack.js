import {attack, GameDep, runJS} from "../main.js";
import {enableArrowKeys} from "./keyHandler.js";

export {attackKeyHandlers};
const attackKeyHandlers = {
    Escape: () =>{
        GameDep.setGameStatus(0)
       // GameDep.intervalId = setInterval(runJS, 100);
       // enableArrowKeys();
        console.log("ESCAPE")

    },
    Enter: () =>{
        console.log("enter")
        GameDep.ctx.clearRect(50, 50, 700, 700);
        console.log(attack.selectedMenuIndex);
        if(attack.selectedMenuIndex === 0){
            attack.switchMenu = "Attack"
            attack.drawAttackMenu()
            attack.drawEnemyHealthBar()
        }
        if(attack.selectedMenuIndex === 1){
           attack.switchMenu = "Item"
           attack.drawItemMenu()
        }
        if(attack.switchMenu === "Attack"){
            console.log(attack.selectedAttackIndex)
        }

    },
    ArrowUp: () => {
        if(attack.switchMenu === "Attack"){
            attack.selectedAttackIndex = (attack.selectedAttackIndex - 1 + 4) % 4;
            attack.drawAttackMenu()
            attack.drawEnemyHealthBar()
        }
        if(attack.switchMenu === "Item"){

        }
        if(attack.switchMenu === "Start") {
            attack.selectedMenuIndex = (attack.selectedMenuIndex + 1) % 2;
            attack.drawBattleMenu();
        }
    },
    ArrowDown: () => {
        if(attack.switchMenu === "Attack"){
            attack.selectedAttackIndex = (attack.selectedAttackIndex + 1) % 4;
            attack.drawAttackMenu()
            attack.drawEnemyHealthBar()
        }
        if(attack.switchMenu === "Item"){

        }
        if(attack.switchMenu === "Start") {
            attack.selectedMenuIndex = (attack.selectedMenuIndex + 1) % 2;
            attack.drawBattleMenu();
        }
    }
}