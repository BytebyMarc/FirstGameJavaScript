import {arrowKeyHandlers, arrowKeyReleaseHandlers} from "./keyboardEvent.js";
import {attackKeyHandlers} from "./keyboardEventAttack.js";
import {startMenuKeyHandler} from "./keyboardEventStartMenu.js";
import {eventManager} from "../GameDataObjekts/LoadGame.js";

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
    Object.keys(arrowKeyReleaseHandlers).forEach(key => {
        eventManager.on(`release_${key}`, arrowKeyReleaseHandlers[key]); // Spezielles Event für Key-Up
    });
}

export function disableArrowKeys() {
    Object.keys(arrowKeyHandlers).forEach(key => {
        eventManager.off(key, arrowKeyHandlers[key]);
    });
    Object.keys(arrowKeyReleaseHandlers).forEach(key => {
        eventManager.off(`release_${key}`, arrowKeyReleaseHandlers[key]);
    });
}



export function enableKeysStartMenu() {
    Object.keys(startMenuKeyHandler).forEach(key => {
        eventManager.on(key, startMenuKeyHandler[key]);
    });
}
export function disableKeysStartMenu() {
    Object.keys(startMenuKeyHandler).forEach(key => {
        eventManager.off(key, startMenuKeyHandler[key]);
    });
}



