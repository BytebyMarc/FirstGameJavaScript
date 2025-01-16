export default class Items{
        constructor(GameDep) {
            this.ctx = GameDep.ctx;
            this.fieldSizeX = GameDep.fieldSizeX;
            this.fieldSizeY = GameDep.fieldSizeY;
            this.tileImages = GameDep.tileImages;
            this.itemStack = []
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
    }

findBook(quest){
    //console.log(quest);
    //console.log(quest.questText);
    // this.ctx.fillStyle = 'white';
    // this.ctx.fillRect(200, 200, 400, 400);
    // this.ctx.fillStyle = "#000";
    // this.ctx.font = "16px Arial";
    // this.drawText(`${text}`, 210, 225, 250,250)
    // //this.ctx.fillText(`${text}`, 210, 225);
    // this.ctx.fillText(`Press ENTER to close`, 320, 580);
    //let text = quest.questText;
    overlay.innerHTML = `<h2>${quest.quest}</h2><p align="left">${quest.questText.replace(/\n/g, '<br>')}</p>`;
    overlay.style.display = 'block';
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