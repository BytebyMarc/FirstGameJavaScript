import {GameDep} from "./main.js";

export default class Attack {
    constructor(GameDep) {
        this.gameStatus = GameDep.gameStatus;
    }
    openWindowAttack(){
        if(GameDep.gameStatus === 4)
        {
            console.log("Attack started");
        }

    }

}