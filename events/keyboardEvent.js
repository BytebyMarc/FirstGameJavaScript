import {field, neighbors, player, GameDep, items} from '../main.js';

const arrowKeyHandlers = {
    Enter: () =>{
        GameDep.setGameStatus(3)
        GameDep.questTriggered = false;
    },
    ArrowUp: () => {
        const neighborID = neighbors.getNorth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === neighborID);
        if(!result || result.art === "MOUNTAIN"){
            player.lifePoints -= 10
            return;
        }
        if (items.itemStack.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.lifePoints += 10
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }

        if(player.getLastPositionID() <= GameDep.howManyBoxes*2-1 && player.getLastPositionID() >= GameDep.howManyBoxes) {
            field.generateNorth()
            mapMoveItemNorth()

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
        if (items.itemStack.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.lifePoints += 10
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }
        if(player.getLastPositionID() <= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)+GameDep.howManyBoxes-2) && player.getLastPositionID() >= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)-1)) {
            field.generateSouth()
            mapMoveItemSouth()
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
        if (items.itemStack.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.lifePoints += 10
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }
        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*i)+1) {
                field.generateWest()
                mapMoveItemWest()
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
        if (items.itemStack.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            player.lifePoints += 10
            console.log("Buch gefunden")
            return
        }else {
            GameDep.setGameStatus(0)
        }
        for(let i = 0;i < GameDep.howManyBoxes;i++) {
            if(player.getLastPositionID() === (GameDep.howManyBoxes*(i+1))-2) {
                field.generateEast()
                mapMoveItemEast()
                return;
            }
        }

        player.move("up", neighborID)
    }


}

function mapMoveItemNorth()
{
        for(let i = 0; i < items.itemStack.length; i++){
            items.itemStack[i].ID = neighbors.getSouth(items.itemStack[i].ID);
            if(items.itemStack[i].ID === null)
            {
                items.itemStack.splice(i,1)
            items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            }
        }
}
function mapMoveItemSouth()
{
    for(let i = 0; i < items.itemStack.length; i++){
        items.itemStack[i].ID = neighbors.getNorth(items.itemStack[i].ID);
        if(items.itemStack[i].ID === null)
        {
            items.itemStack.splice(i,1)
        items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        }
    }
}
function mapMoveItemWest()
{
    for(let i = 0; i < items.itemStack.length; i++){
        items.itemStack[i].ID = neighbors.getEast(items.itemStack[i].ID);
        if(items.itemStack[i].ID === null)
        {
            items.itemStack.splice(i,1)
        items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        }
    }
}
function mapMoveItemEast()
{
    for(let i = 0; i < items.itemStack.length; i++){
        items.itemStack[i].ID = neighbors.getWest(items.itemStack[i].ID);
        if(items.itemStack[i].ID === null)
        {
            items.itemStack.splice(i,1)
        items.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        }
    }
}

export const menuKeyHandlers = {
    m: () => {
        console.log("Menü Geöffnet")

    }

}

export { arrowKeyHandlers };