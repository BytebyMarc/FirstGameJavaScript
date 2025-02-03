import {arrowKeyHandlers} from "./keyboardEvent.js";
import {eventManager} from "../main.js";
export function enableArrowKeys(){
    Object.keys(arrowKeyHandlers).forEach(key => {
        eventManager.on(key, arrowKeyHandlers[key]);
    })
}

export function disableArrowKeys() {
    Object.keys(arrowKeyHandlers).forEach((key) => {
        eventManager.off(key, arrowKeyHandlers[key]);
    });
}


