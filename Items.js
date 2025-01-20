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
    const parsed = JSON.parse(quest);
            console.log(quest);
            let Question = parsed.Question

        overlay.innerHTML = `
        <h2>${Question}</h2>
        <p align="left">
            <strong>Antwort 1:</strong> ${quest.Answer_1}<br>
            <strong>Antwort 2:</strong> ${quest.Answer_2}<br>
            <strong>Antwort 3:</strong> ${quest.Answer_3}<br>
            <strong>Antwort 4:</strong> ${quest.Answer_4}
        </p>
    `;
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