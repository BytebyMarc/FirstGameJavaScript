import {attack, field, GameDep, items, neighbors, player} from "../GameDataObjekts/LoadGame.js";

export default class Items {
    constructor(GameDep) {
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.tileImages = GameDep.tileImages;
        this.intervalId = GameDep.intervalId;
        this.overlay = document.getElementById('overlay');
        this.itemList = []
        this.itemTake = undefined;
        this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        this.dropItem(GameDep.randomID(), "BOOK", 1, 10);
        this.dropItem(GameDep.randomID(), "KAROTTE", 1, 10);
        this.dropItem(GameDep.randomID(), "KURBIS", 1, 10);
        this.dropItem(GameDep.randomID(), "PILZ", 1, 10);
        this.dropItem(GameDep.randomID(), "GURKE", 1, 10);
        this.dropItem(GameDep.randomID(), "BROKOLI", 1, 10);

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
        let newItem = {ID: random, name: name, itemSort: itemSort, playerLifePoints: playerLifePoints, width : 50,
            height : 50};

        if(field.getArtById(random) === "MOUNTAIN") {
            field.updateArtById(random, "GRASS")
        }
        this.itemList.push(newItem);
        //Die id ist in diesem fall das Feld auf dem DAs Item Dropped
    }
    checkCollision(rect1, rect2) {

        const flatarray = arrayGrid.flat()
        const positionEnemy = flatarray.find(obj => obj.ID === rect2.ID);
        return (
            rect1.playerX < positionEnemy.gridX + rect2.width &&
            rect1.playerX  + rect1.width > positionEnemy.gridX &&
            rect1.playerY  < positionEnemy.gridY + rect2.height &&
            rect1.playerY  + rect1.height > positionEnemy.gridY
        );
    }
    findItem() {
       // if (items.itemList.some(item => item.ID === player.getLastPositionID()) && GameDep.gameStatus !== 3) {
          let itemTake = undefined
           if (GameDep.gameStatus !== 3) {
                for (let item of this.itemList) {
                    if (this.checkCollision(player, item)) {
                        console.log("Kollision mit Gegner an Position:", item.x, item.y);
                        //GameDep.setGameStatus(4);
                        this.itemTake = item;
                    }
                }

            console.log(this.itemTake)

            if(this.itemTake) {
                if (this.itemTake.name === "BOOK") {
                    GameDep.setGameStatus(1)
                }
                if (this.itemTake.name === "KAROTTE") {
                    const index = items.itemList.findIndex(item => item.ID === this.itemTake.ID);
                    items.itemList.splice(index, 1);
                    player.bag.push(this.itemTake);
                    console.log("Karotte");
                    this.itemTake = undefined;
                    return true
                }
                if (this.itemTake.name === "PILZ") {
                    const index = items.itemList.findIndex(item => item.ID === this.itemTake.ID);
                    items.itemList.splice(index, 1);
                    player.bag.push(this.itemTake);
                    console.log("Pilz");
                    this.itemTake = undefined;
                    return true
                }
                if (this.itemTake.name === "KURBIS") {
                    const index = items.itemList.findIndex(item => item.ID === this.itemTake.ID);
                    items.itemList.splice(index, 1);
                    player.bag.push(this.itemTake);
                    console.log("Kürbis");
                    this.itemTake = undefined;
                    return true
                }
                if (this.itemTake.name === "GURKE") {
                    const index = items.itemList.findIndex(item => item.ID === this.itemTake.ID);
                    items.itemList.splice(index, 1);
                    player.bag.push(this.itemTake);
                    console.log("Gurke");
                    this.itemTake = undefined;
                    return true
                }
                if (this.itemTake.name === "BROKOLI") {
                    const index = items.itemList.findIndex(item => item.ID === this.itemTake.ID);
                    items.itemList.splice(index, 1);
                    player.bag.push(this.itemTake);
                    console.log("Brokoli");
                    this.itemTake = undefined;
                    return true
                }
            }


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