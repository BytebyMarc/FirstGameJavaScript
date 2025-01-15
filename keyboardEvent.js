import {neighbors, player} from './main.js';

const arrowKeyHandlers = {
    ArrowUp: () => {
        const neighborID = neighbors.getNorth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            return;
        }
        player.move("up", neighborID)
    },
    ArrowDown: () => {
        const neighborID = neighbors.getSouth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            return;
        }
        player.move("up", neighborID)
    },
    ArrowLeft: () => {
        const neighborID = neighbors.getWest(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            return;
        }
        player.move("up", neighborID)
    },
    ArrowRight: () => {
        const neighborID = neighbors.getEast(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            return;
        }
        player.move("up", neighborID)
    }
}

export const menuKeyHandlers = {
    m: () => {
        console.log("Menü Geöffnet")

    }

}

export { arrowKeyHandlers };