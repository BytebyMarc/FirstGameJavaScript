import {runJS} from "../main.js";
import {GameDep} from "../GameDataObjekts/LoadGame.js";
import {disableKeysStartMenu, enableArrowKeys} from "./keyHandler.js";

export {startMenuKeyHandler};

const startMenuKeyHandler ={
    Enter: () =>{

        if (GameDep.selectedStartMenu  === 0) {
            clearInterval(GameDep.intervalId);
            GameDep.gameStatus = 0
            disableKeysStartMenu()
            enableArrowKeys();
            GameDep.intervalId = setInterval(runJS, 100);
        }
        if (GameDep.selectedStartMenu  === 1) {
            GameDep.selectedStartMenu = 9
            clearInterval(GameDep.intervalId);
            localStorage.clear();
            disableKeysStartMenu()
            enableArrowKeys();
            GameDep.intervalId = setInterval(runJS, 100);


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
    if (GameDep.selectedStartMenu < 2) {
        if (key.key === "ArrowUp") {
            GameDep.selectedStartMenu = (GameDep.selectedStartMenu - 1 + 2) % 2;
        }
        if (key.key === "ArrowDown") {
            GameDep.selectedStartMenu = (GameDep.selectedStartMenu + 1) % 2;
        }
    }

}




