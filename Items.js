export default class Items{
        constructor(GameDep) {
            this.ctx = GameDep.ctx;
            this.fieldSizeX = GameDep.fieldSizeX;
            this.fieldSizeY = GameDep.fieldSizeY;
            this.tileImages = GameDep.tileImages;
            this.intervalId = GameDep.intervalId;
            this.overlay = document.getElementById('overlay');
            this.itemList = []
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
            this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
    }

    findBook(quest){
        const parsed = JSON.parse(quest);
                console.log(quest);
            this.overlay.innerHTML = `
                    <h2>${parsed.Question}</h2>
                    <div class="answer" id="answer1"> ${parsed.Answer_1}</div>
                    <div class="answer" id="answer2"> ${parsed.Answer_2}</div>
                    <div class="answer" id="answer3">${parsed.Answer_3} </div>
                    <div class="answer" id="answer4"> ${parsed.Answer_4}</div>`;
                    overlay.style.display = 'block';
                    clearInterval(this.intervalId);
    }

    dropItem(random, name, itemSort, playerLifePoints)
    {
    let newItem = {ID: random, name: name, itemSort: itemSort, playerLifePoints: playerLifePoints};
    this.itemList.push(newItem);
    //Die id ist in diesem fall das Feld auf dem DAs Item Dropped
    }
    draw(){
        for(let i = 0; i < this.itemList.length; i++){
            let result = arrayGrid.flat().find(cell => cell.ID === this.itemList[i].ID);
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