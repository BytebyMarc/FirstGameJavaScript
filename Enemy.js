import {GameDep, player} from "./main.js";

export default class Enemy{
    constructor(GameDep) {
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.tileImages = GameDep.tileImages;
        this.intervalId = GameDep.intervalId;
        this.enemyList = []
        this.dropEnemy(GameDep.randomID(), "MAGIER", 1, 10);

    }

dropEnemy(random, name, itemSort, playerLifePoints)
    {
        let newItem = {ID: random, name: name, itemSort: itemSort, playerLifePoints: playerLifePoints};
        this.enemyList.push(newItem);
        //Die id ist in diesem fall das Feld auf dem DAs Item Dropped
    }

findEnemy()
{
    if (this.enemyList.some(enemy => enemy.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
        GameDep.setGameStatus(4)
        console.log("gegner gefunden")
        return true
    } else {
        GameDep.setGameStatus(0)
    }

}
drawEnemy() {
        for (let i = 0; i < this.enemyList.length; i++) {
            let result = arrayGrid.flat().find(cell => cell.ID === this.enemyList[i].ID);
            let img = this.tileImages[this.enemyList[i].name];
            if (img.complete) {
                this.ctx.drawImage(img, result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
            } else {
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
            }
        }
    }
}