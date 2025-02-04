import {field, GameDep, items, neighbors, player} from "./main.js";

export default class Items {
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

    }

    findBook(quest) {
        const parsed = JSON.parse(quest);
        console.log(quest);
        this.correctAnswer = parsed.CorrectAnswer
        this.overlay.innerHTML = `
                    <h2>${parsed.Question}</h2>
                    <div class="answer" id="answer1"> ${parsed.Answer_1}</div>
                    <div class="answer" id="answer2"> ${parsed.Answer_2}</div>
                    <div class="answer" id="answer3">${parsed.Answer_3} </div>
                    <div class="answer" id="answer4"> ${parsed.Answer_4}</div>`;
        this.overlay.style.display = 'block';
        clearInterval(this.intervalId);
    }

    dropItem(random, name, itemSort, playerLifePoints) {
        let newItem = {ID: random, name: name, itemSort: itemSort, playerLifePoints: playerLifePoints};

        if(field.getArtById(random) === "MOUNTAIN") {
            field.updateArtById(random, "GRASS")
        }
        this.itemList.push(newItem);
        //Die id ist in diesem fall das Feld auf dem DAs Item Dropped
    }
    findItem() {
        if (items.itemList.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
            GameDep.setGameStatus(1)
            return true
        } else {
            GameDep.setGameStatus(0)
        }
    }

    mapMoveItem(direction) {
        const directionMap = {
            north: "getSouth",
            south: "getNorth",
            west: "getEast",
            east: "getWest"
        };
        const neighborFunction = directionMap[direction.toLowerCase()];
        if (!neighborFunction) {
            console.error(`Invalid direction: ${direction}`);
            return;
        }
        for (let i = 0; i < this.itemList.length; i++) {
            this.itemList[i].ID = neighbors[neighborFunction](this.itemList[i].ID);
            if (this.itemList[i].ID === null) {
                this.itemList.splice(i, 1);
                this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
                i--; // Adjust index after splicing
            }
        }
    }

    drawBook() {
        for (let i = 0; i < this.itemList.length; i++) {
            let result = arrayGrid.flat().find(cell => cell.ID === this.itemList[i].ID);
            let img = this.tileImages[this.itemList[i].name];
            if (img.complete) {
                this.ctx.drawImage(img, result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
            } else {
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(result.gridX, result.gridY, this.fieldSizeX, this.fieldSizeY);
            }
        }
    }
}