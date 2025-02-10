export default class Player {
    constructor(GameDep) {
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.name = "Marc"
        this.lifePoints = 100
        this.maxLifePoints = 100
        this.experiencePoints = 0;
        this.experiencePointsNextLevel = 50
        this.playerLevel = 1;
        this.playerX = 350;
        this.playerY = 300;
        this.width = 50;
        this.height = 50;
        this.lastPositionID = 103
        this.tileImages = GameDep.tileImages;
        this.attack1 = "Feuerball";
        this.attack1Hit = 20;
        this.attack2 = "Kohlewurf";
        this.attack2Hit = 30;
        this.attack3 = "Flügelschlag";
        this.attack3Hit = 20;
        this.attack4 = "Anbrüllen";
        this.attack4Hit = 10;
        this.bag = []
    }


    move2up(playerX, playerY, neighborID) {
        const flatarray = arrayGrid.flat()
        const positionPlayer = flatarray.find(obj => obj.ID === this.lastPositionID);

// obere Linie
        if(this.playerY < positionPlayer.gridY-1){
            this.lastPositionID = neighborID;
            // console.log("obere Linie");
            // console.log(positionPlayer);
            // console.log(this.playerY);
        }}

    move2down(playerX, playerY, neighborID) {
        const flatarray = arrayGrid.flat()
        const positionPlayer = flatarray.find(obj => obj.ID === this.lastPositionID);
// untere Linie
        if((this.playerY +49) > (positionPlayer.gridY +50)){
            this.lastPositionID = neighborID;
            // console.log("untere Linie");
            // console.log(positionPlayer);
            // console.log(this.playerY);
        }}
    move2left(playerX, playerY, neighborID) {
        const flatarray = arrayGrid.flat()
        const positionPlayer = flatarray.find(obj => obj.ID === this.lastPositionID);

// linke linie
        if(this.playerX < positionPlayer.gridX-1){
            this.lastPositionID = neighborID;
            // console.log("Linke linie");
            // console.log(positionPlayer);
            // console.log(this.playerY);
        }}
    move2right(playerX, playerY, neighborID) {
        const flatarray = arrayGrid.flat()
        const positionPlayer = flatarray.find(obj => obj.ID === this.lastPositionID);
// untere Linie
        if((this.playerX +49) > (positionPlayer.gridX +50)){
            this.lastPositionID = neighborID;
            // console.log("rechte Linie");
            // console.log(positionPlayer);
            // console.log(this.playerY);
        }}

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
    setPlayerPosition(playerX, playerY) {
        this.playerX = this.playerX+playerX
        this.playerY = this.playerY+playerY

    }
    setLastPositionID(fieldID){
        this.lastPositionID = fieldID;
    }
    getLastPositionID(){
        return this.lastPositionID;
    }
    setPlayerLifePoints(playerLifePoints){
        this.lifePoints += playerLifePoints;
        if (this.lifePoints < this.maxLifePoints){
            return this.lifePoints
        }
        else {
            this.lifePoints = this.maxLifePoints
        }
    }
    levelCalculator(plusXpPoints){

        let totalPoints = this.experiencePoints + plusXpPoints;

        if(totalPoints >= this.experiencePointsNextLevel){
            this.playerLevel = this.playerLevel + 1;
            this.experiencePoints = totalPoints - this.experiencePointsNextLevel;
            this.experiencePointsNextLevel = this.experiencePointsNextLevel * 2;
            this.maxLifePoints = this.maxLifePoints + 10
        }else
        {
            this.experiencePoints = this.experiencePoints + plusXpPoints;

        }
    }
    draw() {
        const result = arrayGrid.flat().find(cell => cell.ID === this.lastPositionID);
        let img = this.tileImages.DRAGON
        if (img.complete) {
            this.ctx.drawImage(img, this.playerX, this.playerY, this.fieldSizeX, this.fieldSizeY);
        }else {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
        }
        //console.log("last posistion:" + this.lastPositionID)
    }
    drawLevel(level) {
        // Bereite den Level-Text vor
        const levelText = `Level: ${level}`;

        // Setze die Schriftart (z.B. 16px Arial)
        this.ctx.font = "bold 24px sans-serif";

        // Messe die Breite des Textes, um ihn rechts auszurichten
        const textWidth = this.ctx.measureText(levelText).width;

        // Berechne die Position: 20 Pixel Abstand vom rechten Rand und oben
        const xLevel = 800 - textWidth - 20;
        // Die y-Position ist 20px vom oberen Rand plus die Schriftgröße (als Näherung)
        const yLevel = 20 + 16;

        // Setze die Textfarbe (z.B. Weiß) und zeichne den Text
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText(levelText, xLevel, yLevel);
    }
    drawItemBag() {
        // Fülle den Hintergrund (ganzes Canvas)
        this.ctx.fillStyle = "#DCDCDC";

        // Definiere den Inventarbereich
        const inventoryHeight = 30;
        const inventoryY = 800 - inventoryHeight;

        // Zeichne den Hintergrund des Inventarbereichs
        this.ctx.fillRect(200, inventoryY, 400, inventoryHeight);

        // Anzahl der Slots
        const numSlots = 6;
        const slotMargin = 1;
        const slotWidth = (400 - (numSlots + 1) * slotMargin) / numSlots;
        const slotHeight = inventoryHeight - 2 * slotMargin;

        for (let i = 0; i < numSlots; i++) {
            const x = 200 + slotMargin + i * (slotWidth + slotMargin);
            const y = inventoryY + slotMargin;

            // Slot-Hintergrund
          //  this.ctx.fillStyle = "rgb(200,200,200)";
            this.ctx.fillRect(x, y, slotWidth, slotHeight);

            // Rahmen um den Slot
            this.ctx.strokeStyle = "rgb(0,0,0)";
            this.ctx.strokeRect(x, y, slotWidth, slotHeight);

            // Falls ein Item existiert, zeige das Bild
            if (this.bag[i]) {

                let img = this.tileImages[this.bag[i].name];
                if (img.complete) {
                    this.ctx.drawImage(img, x + 2, y + 2, slotWidth -2, slotHeight-2);
                }

            }
        }
    }


}