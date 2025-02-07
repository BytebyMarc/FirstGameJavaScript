import {GameDep, field, player, attack} from "./LoadGame.js";

export default class Enemy{
    constructor(GameDep) {
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.tileImages = GameDep.tileImages;
        this.intervalId = GameDep.intervalId;
        this.enemyList = []
        this.dropEnemy(GameDep.randomID(), "MAGIER", 150, 15,20,10,
            "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
         this.dropEnemy(GameDep.randomID(), "ZAUBERER", 150, 15,20,10,
             "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
        this.dropEnemy(GameDep.randomID(), "MONSTER", 150, 15,20,10,
            "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
        this.dropEnemy(GameDep.randomID(), "MAGIER", 150, 15,20,10,
            "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
        this.dropEnemy(GameDep.randomID(), "ZAUBERER", 150, 15,20,10,
            "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
        this.dropEnemy(GameDep.randomID(), "MONSTER", 150, 15,20,10,
            "Feuerball",40,"iceball", 25, "Flügelschlag", 50, "Heilung", -50);
    }

dropEnemy(random, name, hitpoint, defensive, speed, critical, attack1, attack1Hit, attack2, attack2Hit,
          attack3, attack3Hit, attack4, attack4Hit)
    {
        if(field.getArtById(random) === "MOUNTAIN") {
            field.updateArtById(random, "GRASS")
        }
        let newEnemy = {
            ID: random,
            name: name,
            hitpoint: hitpoint,
            maxHitpoint: hitpoint,
            defensive: defensive,
            speed: speed,
            critical: critical,
            attack1: attack1,
            attack1Hit: attack1Hit,
            attack2: attack2,
            attack2Hit: attack2Hit,
            attack3: attack3,
            attack3Hit: attack3Hit,
            attack4: attack4,
            attack4Hit: attack4Hit,
        };
        this.enemyList.push(newEnemy);
        //Die id ist in diesem fall das Feld auf dem DAs Item Dropped
    }

findEnemy()
{
    if (this.enemyList.some(enemy => enemy.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {

        attack.enemy = this.enemyList.find(enemy => enemy.ID === player.getLastPositionID())
        GameDep.setGameStatus(4)
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