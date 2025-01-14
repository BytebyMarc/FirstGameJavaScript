export default class Player {
    constructor(fieldSizeX, fieldSizeY, ctx) {
        this.ctx = ctx;
        this.fieldSizeX = fieldSizeX;
        this.fieldSizeY = fieldSizeY;
        this.name = "Marc"
        this.currentField = 1
        this.lastPositionID = 0
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
    canMove(direction) {
        //move is possible
    }
    draw() {

        const result = arrayGrid.flat().find(cell => cell.ID === this.lastPositionID);
        const tileImages = {
            DRAGON: new Image(),
        };

        tileImages.DRAGON.src = 'assets/dragon.png';
        let img = tileImages.DRAGON

        if (img.complete) {
            this.ctx.drawImage(img, result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
        }else {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);

        }console.log("last posistion:" + this.lastPositionID)
    }
}