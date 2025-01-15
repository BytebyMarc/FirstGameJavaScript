import {field, neighbors, player, GameDep} from '../main.js';

const arrowKeyHandlers = {
    ArrowUp: () => {
        const neighborID = neighbors.getNorth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.lifePoints -= 10
            return;
        }
        if(player.getLastPositionID() <= GameDep.howManyBoxes*2-1 && player.getLastPositionID() >= GameDep.howManyBoxes) {
            field.generateNorth()
            return;
        }
        player.move("up", neighborID)
    },
    ArrowDown: () => {
        const neighborID = neighbors.getSouth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.lifePoints -= 10
            return;
        }
        if(player.getLastPositionID() <= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)+GameDep.howManyBoxes-2) && player.getLastPositionID() >= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)-1)) {
            field.generateSouth()
            return;
        }
        player.move("up", neighborID)
    },
    ArrowLeft: () => {
        const neighborID = neighbors.getWest(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.lifePoints -= 10
            return;
        }
        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*i)+1) {
                field.generateWest()
                return;
            }
        }

        player.move("up", neighborID)
    },
    ArrowRight: () => {
        const neighborID = neighbors.getEast(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.lifePoints -= 10
            return;
        }

        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*(i+1))-2) {
                field.generateEast()
                return;
            }
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