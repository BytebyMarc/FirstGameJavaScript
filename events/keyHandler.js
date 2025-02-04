import {arrowKeyHandlers} from "./keyboardEvent.js";
import {attackKeyHandlers} from "./keyboardEventAttack.js";
import {eventManager} from "../main.js";

export function enableAttackKeyHandlers() {
    Object.keys(attackKeyHandlers).forEach(key => {
        eventManager.on(key, attackKeyHandlers[key]);
    });
}

export function disableAttackKeyHandlers() {
    Object.keys(attackKeyHandlers).forEach(key => {
        eventManager.off(key, attackKeyHandlers[key]);
    });
}

export function enableArrowKeys() {
    Object.keys(arrowKeyHandlers).forEach(key => {
        eventManager.on(key, arrowKeyHandlers[key]);
    });
}

export function disableArrowKeys() {
    Object.keys(arrowKeyHandlers).forEach(key => {
        eventManager.off(key, arrowKeyHandlers[key]);
    });
}



