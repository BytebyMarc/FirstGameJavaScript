import {field, neighbors, player, GameDep, items, runJS} from '../main.js';

const arrowKeyHandlers = {
    Enter: () =>{
        GameDep.setGameStatus(3)
        GameDep.questTriggered = false;
        overlay.style.display = 'none';
        GameDep.intervalId = setInterval(runJS, 100);
    },
    ArrowUp: () => {
        const neighborID = neighbors.getNorth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.setPlayerLifePoints(-10)
            return;
        }
        if (items.itemList.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.setPlayerLifePoints(10)
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }

        if(player.getLastPositionID() <= GameDep.howManyBoxes*2-1 && player.getLastPositionID() >= GameDep.howManyBoxes) {
            field.generateNorth()
            mapMoveItem("north")
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
        if (items.itemList.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.setPlayerLifePoints(10)
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }
        if(player.getLastPositionID() <= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)+GameDep.howManyBoxes-2) && player.getLastPositionID() >= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)-1)) {
            field.generateSouth()
            mapMoveItem("south")
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
        if (items.itemList.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.setPlayerLifePoints(10)
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }
        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*i)+1) {
                field.generateWest()
                mapMoveItem("west")
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
        if (items.itemList.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.setPlayerLifePoints(10)
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }
        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*(i+1))-2) {
                field.generateEast()
                mapMoveItem("east")
                return;
            }
        }

        player.move("up", neighborID)
    }


}

function mapMoveItem(direction) {
    const directionMap = {
        north: "getSouth",
        south: "getNorth",
        west: "getEast",
        east: "getWest"
    };

    const neighborFunction = directionMap[direction.toLowerCase()];

    if (!neighborFunction) {
        console.error(`Invalid direction: ${direction}`);
        return;
    }

    for (let i = 0; i < items.itemList.length; i++) {
        items.itemList[i].ID = neighbors[neighborFunction](items.itemList[i].ID);
        if (items.itemList[i].ID === null) {
            items.itemList.splice(i, 1);
            items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            i--; // Adjust index after splicing
        }
    }
}


export const menuKeyHandlers = {
    m: () => {
        console.log("Menü Geöffnet")
    }
}

export { arrowKeyHandlers };