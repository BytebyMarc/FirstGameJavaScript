export default class Player {
    constructor(GameDep) {
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.name = "Marc"
        this.lifePoints = 100
        this.lastPositionID = 103
        this.tileImages = GameDep.tileImages;
        this.attack1 = "first";
        this.attack1Hit = 20;
        this.attack2 = "second";
        this.attack2Hit = 30;
        this.attack3 = "third";
        this.attack3Hit = 20;
        this.attack4 = "fourth";
        this.attack4Hit = 10;
    }
    move(direction, setLastPositionID) {
        switch (direction) {
            case "up":
                this.lastPositionID = setLastPositionID;
                break;
            case "down":
                this.lastPositionID = setLastPositionID;
                break;
            case "left":
                this.lastPositionID = setLastPositionID;
                break;
            case "right":
                this.lastPositionID = setLastPositionID;
                break;
        }
    }
    setLastPositionID(fieldID){
        this.lastPositionID = fieldID;
    }
    getLastPositionID(){
        return this.lastPositionID;
    }
    setPlayerLifePoints(playerLifePoints){
        this.lifePoints += playerLifePoints;
        if (this.lifePoints < 100){
            return this.lifePoints
        }
        else {
            this.lifePoints = 100
        }
    }
    canMove(direction) {
        //move is possible
    }
    draw() {
        const result = arrayGrid.flat().find(cell => cell.ID === this.lastPositionID);
        let img = this.tileImages.DRAGON
        if (img.complete) {
            this.ctx.drawImage(img, result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
        }else {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
        }
        //console.log("last posistion:" + this.lastPositionID)
    }
}