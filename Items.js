export default class Items{
        constructor(GameDep) {
            this.ctx = GameDep.ctx;
            this.fieldSizeX = GameDep.fieldSizeX;
            this.fieldSizeY = GameDep.fieldSizeY;
            this.tileImages = GameDep.tileImages;
            this.itemStack = []
    }

findBook(quest){
    //console.log(quest);
    //console.log(quest.questText);

    let text = quest.questText;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(200, 200, 400, 400);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "16px Arial";
    this.ctx.fillText(`${text}`, 210, 225);
    this.ctx.fillText(`Press ENTER to close`, 320, 580);
}

    dropItem(random, name, itemSort, playerLifePoints)
    {
    let newItem = {ID: random, name: name, itemSort: itemSort, playerLifePoints: playerLifePoints};
    this.itemStack.push(newItem);
    //console.log(this.itemStack);
    }
    draw(){
        for(let i = 0; i < this.itemStack.length; i++){
            let result = arrayGrid.flat().find(cell => cell.ID === this.itemStack[i].ID);
            let img = this.tileImages.BOOK
            if (img.complete) {
                this.ctx.drawImage(img, result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
            }else {
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
            }
        }
    }
}