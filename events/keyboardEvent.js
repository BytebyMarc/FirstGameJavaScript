import {field, neighbors, player, GameDep, items, runJS, enemy} from '../main.js';
export { arrowKeyHandlers };

const arrowKeyHandlers = {
    Enter: () =>{
        GameDep.setGameStatus(0)
        GameDep.questTriggered = false;
        overlay.style.display = 'none';

    },
    ArrowUp: () => {
        const neighborID = neighbors.getNorth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.setPlayerLifePoints(-10)
            return;
        }

        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        if(player.getLastPositionID() <= GameDep.howManyBoxes*2-1 && player.getLastPositionID() >= GameDep.howManyBoxes) {
            field.generateNorth()
            items.mapMoveItem("north")
            return;
        }
        player.move("up", neighborID)
    },
    ArrowDown: () => {
        const neighborID = neighbors.getSouth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.setPlayerLifePoints(-10)
            return;
        }

        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        if(player.getLastPositionID() <= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)+GameDep.howManyBoxes-2) && player.getLastPositionID() >= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)-1)) {
            field.generateSouth()
            items.mapMoveItem("south")
            return;
        }
        player.move("up", neighborID)
    },
    ArrowLeft: () => {
        const neighborID = neighbors.getWest(player.getLastPositionID());

        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.setPlayerLifePoints(-10)
            return;
        }

        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*i)+1) {
                field.generateWest()
                items.mapMoveItem("west")
                return;
            }
        }

        player.move("up", neighborID)
    },
    ArrowRight: () => {
        const neighborID = neighbors.getEast(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.setPlayerLifePoints(-10)
            return;
        }
        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*(i+1))-2) {
                field.generateEast()
                items.mapMoveItem("east")
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

