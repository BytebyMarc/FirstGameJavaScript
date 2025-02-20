import {GameDep, field, player, items, enemy,neighbors} from "../GameDataObjekts/LoadGame.js";
// export { arrowKeyHandlers, updateMovementUP};



export const arrowKeyHandlers = {
    ArrowUp: () => GameDep.keyState["ArrowUp"] = true,
    ArrowDown: () => GameDep.keyState["ArrowDown"] = true,
    ArrowLeft: () => GameDep.keyState["ArrowLeft"] = true,
    ArrowRight: () => GameDep.keyState["ArrowRight"] = true,
    KeyW: () => GameDep.keyState["ArrowUp"] = true,
    KeyS: () => GameDep.keyState["ArrowDown"] = true,
    KeyA: () => GameDep.keyState["ArrowLeft"] = true,
    KeyD: () => GameDep.keyState["ArrowRight"] = true
};

// Key-Release muss die Bewegung beenden
export const arrowKeyReleaseHandlers = {
    ArrowUp: () => GameDep.keyState["ArrowUp"] = false,
    ArrowDown: () => GameDep.keyState["ArrowDown"] = false,
    ArrowLeft: () => GameDep.keyState["ArrowLeft"] = false,
    ArrowRight: () => GameDep.keyState["ArrowRight"] = false,
    KeyW: () => GameDep.keyState["ArrowUp"] = false,
    KeyS: () => GameDep.keyState["ArrowDown"] = false,
    KeyA: () => GameDep.keyState["ArrowLeft"] = false,
    KeyD: () => GameDep.keyState["ArrowRight"] = false
};

export function updateMovement(player) {
    if (GameDep.keyState["ArrowUp"]) {
        let neighborID = neighbors.getNorth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
        if (!result || result.art === "MOUNTAIN") {
            player.setPlayerLifePoints(-5)
        }

        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        if (player.getLastPositionID() <= GameDep.howManyBoxes * 2 - 1 && player.getLastPositionID() >= GameDep.howManyBoxes) {
            field.generateNorth()
            items.mapMoveItem("north")
            return;
        }
        player.setPlayerPosition(0, -15)
        player.move2up(0, 0, neighborID)
        // player.move("up", neighborID)

    }


    if (GameDep.keyState["ArrowDown"]) {
        const neighborID = neighbors.getSouth(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
        if (!result || result.art === "MOUNTAIN") {
            player.setPlayerLifePoints(-5)

        }

        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        if (player.getLastPositionID() <= ((GameDep.howManyBoxes - 1) * (GameDep.howManyBoxes - 1) + GameDep.howManyBoxes - 2) && player.getLastPositionID() >= ((GameDep.howManyBoxes - 1) * (GameDep.howManyBoxes - 1) - 1)) {
            field.generateSouth()
            items.mapMoveItem("south")
            return;
        }
        player.setPlayerPosition(0, 15)
        player.move2down(0, 0, neighborID)
        // player.move("up", neighborID)


    }
    if (GameDep.keyState["ArrowLeft"]) {
        const neighborID = neighbors.getWest(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());


        if (!result || result.art === "MOUNTAIN") {
            player.setPlayerLifePoints(-5)

        }

        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        for (let i = 0; i < GameDep.howManyBoxes; i++) {
            if (player.getLastPositionID() === (GameDep.howManyBoxes * i) + 1) {
                field.generateWest()
                items.mapMoveItem("west")
                return;
            }
        }

        player.setPlayerPosition(-15, 0)
        player.move2left(0, 0, neighborID)
        // player.move("up", neighborID)

    }
    if (GameDep.keyState["ArrowRight"]) {
        const neighborID = neighbors.getEast(player.getLastPositionID());
        const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
        if (!result || result.art === "MOUNTAIN") {
            player.setPlayerLifePoints(-5)
        }
        if (items.findItem()) return;
        if (enemy.findEnemy()) return;

        for (let i = 0; i < GameDep.howManyBoxes; i++) {
            if (player.getLastPositionID() === (GameDep.howManyBoxes * (i + 1)) - 2) {
                field.generateEast()
                items.mapMoveItem("east")
                return;
            }
        }

        player.setPlayerPosition(15, 0)
        player.move2right(0, 0, neighborID)
        //  player.move("up", neighborID)

    }
}
// const arrowKeyHandlers2 = {
//     Enter: () =>{
//         GameDep.setGameStatus(0)
//         GameDep.questTriggered = false;
//         overlay.style.display = 'none';
//
//     },
//     ArrowUp: () => {
//         const neighborID = neighbors.getNorth(player.getLastPositionID());
//         const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
//         if(!result || result.art === "MOUNTAIN"){
//             player.setPlayerLifePoints(-5)
//         }
//
//         if (items.findItem()) return;
//         if (enemy.findEnemy()) return;
//
//         if(player.getLastPositionID() <= GameDep.howManyBoxes*2-1 && player.getLastPositionID() >= GameDep.howManyBoxes) {
//             field.generateNorth()
//             items.mapMoveItem("north")
//             return;
//         }
//         player.setPlayerPosition(0,-15)
//         player.move2up(0,0, neighborID)
//       // player.move("up", neighborID)
//     },
//     ArrowDown: () => {
//         const neighborID = neighbors.getSouth(player.getLastPositionID());
//         const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
//         if(!result || result.art === "MOUNTAIN"){
//             player.setPlayerLifePoints(-5)
//
//         }
//
//         if (items.findItem()) return;
//         if (enemy.findEnemy()) return;
//
//         if(player.getLastPositionID() <= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)+GameDep.howManyBoxes-2) && player.getLastPositionID() >= ((GameDep.howManyBoxes-1)*(GameDep.howManyBoxes-1)-1)) {
//             field.generateSouth()
//             items.mapMoveItem("south")
//             return;
//         }
//         player.setPlayerPosition(0,15)
//         player.move2down(0,0, neighborID)
//        // player.move("up", neighborID)
//     },
//     ArrowLeft: () => {
//         const neighborID = neighbors.getWest(player.getLastPositionID());
//         const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
//
//
//         if(!result || result.art === "MOUNTAIN"){
//             player.setPlayerLifePoints(-5)
//
//         }
//
//         if (items.findItem()) return;
//         if (enemy.findEnemy()) return;
//
//         for(let i = 0;i < GameDep.howManyBoxes;i++) {
//             if(player.getLastPositionID() === (GameDep.howManyBoxes*i)+1) {
//                 field.generateWest()
//                 items.mapMoveItem("west")
//                 return;
//             }
//         }
//
//         player.setPlayerPosition(-15,0)
//         player.move2left(0,0, neighborID)
//        // player.move("up", neighborID)
//     },
//     ArrowRight: () => {
//         const neighborID = neighbors.getEast(player.getLastPositionID());
//         const result = arrayGrid.flat().find(cell => cell.ID === player.getLastPositionID());
//         if(!result || result.art === "MOUNTAIN"){
//             player.setPlayerLifePoints(-5)
//         }
//         if (items.findItem()) return;
//         if (enemy.findEnemy()) return;
//
//         for(let i = 0;i < GameDep.howManyBoxes;i++) {
//             if(player.getLastPositionID() === (GameDep.howManyBoxes*(i+1))-2) {
//                 field.generateEast()
//                 items.mapMoveItem("east")
//                 return;
//             }
//         }
//
//         player.setPlayerPosition(15,0)
//         player.move2right(0,0, neighborID)
//       //  player.move("up", neighborID)
//     }
//
//
// }
//
//
//
// export const menuKeyHandlers = {
//     m: () => {
//         console.log("Menü Geöffnet")
//     }
// }
