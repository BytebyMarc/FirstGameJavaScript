import GameDependencies from "./GameDependencies";
import Player from "./Player";
import Field from "./Field";
import Neighbors from "./Neighbors";
import Items from "../Items/Items";
import Attack from "../attack/Attack";
import Enemy from "../attack/Enemy";
import Data from "../Dataloader/Data";
import Question from "../question/Question";
import EventManager from "../events/EventManager";
import Statusbar from "../GlobalDrawFunction/statusbar";
import {mouseClickHandler, mousePositionEvent} from "../events/mouseEvent";

    let GameDepInstance
    let GameDepParsed = localStorage.getItem("GameDep");
    if (GameDepParsed) {
        GameDepParsed = JSON.parse(GameDepParsed);
        GameDepInstance = new GameDependencies(16);
        Object.assign(GameDepInstance, GameDepParsed);
    } else {
        GameDepInstance = new GameDependencies(16);
    }

    export let GameDep = GameDepInstance;

    GameDep.canvas = document.getElementById("myCanvas");
    GameDep.container = document.querySelector('.overlay');
    GameDep.ctx = GameDep.canvas.getContext("2d");
    GameDep.tileImages = {
        DRAGON: new Image(),
        BOOK: new Image(),
        GRASS: new Image(),
        WATER: new Image(),
        FOREST: new Image(),
        MOUNTAIN: new Image(),
        CITY: new Image(),
        MAGIER: new Image(),
        ZAUBERER: new Image(),
        MONSTER: new Image(),
        KAROTTE: new Image(),
        KURBIS: new Image(),
        PILZ: new Image(),
        GURKE: new Image(),
        BROKOLI: new Image()
    };
    GameDep.tileImages.DRAGON.src = 'assets/dragon.png';
    GameDep.tileImages.BOOK.src = 'assets/Book.png';
    GameDep.tileImages.MAGIER.src = 'assets/magier.png';
    GameDep.tileImages.GRASS.src = 'assets/grass.png';
    GameDep.tileImages.WATER.src = 'assets/water.png';
    GameDep.tileImages.FOREST.src = 'assets/forrest.png';
    GameDep.tileImages.MOUNTAIN.src = 'assets/mountain.png';
    GameDep.tileImages.ZAUBERER.src = 'assets/zauberer.png';
    GameDep.tileImages.MONSTER.src = 'assets/monster1.png';
    GameDep.tileImages.KAROTTE.src = 'assets/karotte.png';
    GameDep.tileImages.KURBIS.src = 'assets/kurbis.png';
    GameDep.tileImages.PILZ.src = 'assets/pilz.png';
    GameDep.tileImages.GURKE.src = 'assets/gurke.png';
    GameDep.tileImages.BROKOLI.src = 'assets/brokoli.png';
    GameDep.gameStart = true;

    let playerInstance
    let playerParsed = localStorage.getItem("Player");
    if (playerParsed) {
        playerParsed = JSON.parse(playerParsed);
        playerInstance = new Player(GameDep);
        Object.assign(playerInstance, playerParsed)
        playerInstance.ctx = GameDep.canvas.getContext("2d");
        playerInstance.tileImages = GameDep.tileImages;
    } else {
        playerInstance = new Player(GameDep);
    }
    export let player = playerInstance

    let fieldInstance
    let fieldParsed = localStorage.getItem("FieldC");
    if (fieldParsed) {
        fieldParsed = JSON.parse(fieldParsed);
        fieldInstance = new Field(GameDep);
        fieldInstance.ctx = GameDep.canvas.getContext("2d");
        fieldInstance.tileImages = GameDep.tileImages;
        arrayGrid = fieldParsed
    } else {
        fieldInstance = new Field(GameDep);
    }
    export let field = fieldInstance


    export let neighbors = new Neighbors(GameDep);

    let itemsInstance
    let itemsParsed = localStorage.getItem("Item");
    if (itemsParsed) {
        itemsParsed = JSON.parse(itemsParsed);
        itemsInstance = new Items(GameDep);
        itemsInstance.itemList = itemsParsed
    } else {
        itemsInstance = new Items(GameDep);
    }
    export let items = itemsInstance;
    export let attack = new Attack(GameDep, player);
    export let enemy = new Enemy(GameDep);


    export let data = new Data();
    export let question = new Question(data);
    export const eventManager = new EventManager();
    export let statusBar = new Statusbar(GameDep);

    export function setNewGame() {
        GameDep.selectedStartMenu = 8
        field = null
        player = null
        items = null
        enemy = null
        field = new Field(GameDep);
        player = new Player(GameDep);
        items = new Items(GameDep);
        enemy = new Enemy(GameDep);
    }

GameDep.canvas.addEventListener('click', mouseClickHandler(player, GameDep));
GameDep.container.addEventListener('click', (event) => {question.checkAnswer(event); });
document.addEventListener('keydown', (event) => { eventManager.emit(event.key, event); });
GameDep.canvas.onmousedown = mouseClickHandler;
GameDep.canvas.onmousemove = mousePositionEvent;


export function drawStartMenu() {
    const menuMargin = 30;
    const menuWidth = 400 - 2 * menuMargin; // 700px Breite
    const menuHeight = 100; // Erhöhte Höhe für vertikales Layout
    const menuX = 240;
    const menuY = 340;
    const optionHeight = menuHeight / 2; // Höhe für jede Menüoption

    // Hintergrund des Menüs (abgerundeter Kasten)

    function startMenu (ctx, x, y, width, height, radius){
        ctx.fillStyle = "#fff";

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();

    }

    startMenu(GameDep.ctx, menuX, menuY, menuWidth, menuHeight, 10);

    // Rahmen um das Menü
    GameDep.ctx.lineWidth = 3;
    GameDep.ctx.strokeStyle = "#fff";
    GameDep.ctx.stroke();

    // Menüoptionen: "Item" und "Attacken"
    const options = ["Spiel Laden", "Neues Spiel"];
    GameDep.ctx.font = "bold 24px Arial";
    GameDep.ctx.textBaseline = "middle";

    // Zeichne die einzelnen Menüoptionen übereinander
    for (let i = 0; i < options.length; i++) {
        let optionY = menuY + i * optionHeight;
        let optionCenterX = menuX + menuWidth / 2;
        let optionCenterY = optionY + optionHeight / 2;

        // Wenn diese Option ausgewählt ist, wird ein halbtransparentes Highlight gezeichnet
        if (GameDep.selectedStartMenu === i) {
            GameDep.ctx.save();
            GameDep.ctx.fillStyle = "#123";

            GameDep.ctx.fillRect(menuX, optionY, menuWidth, optionHeight);
            GameDep.ctx.restore();
            GameDep.ctx.fillStyle = "#ff"; // Ausgewählte Option in Weiß
        } else {
            GameDep.ctx.fillStyle = "#000"; // Unausgewählte Optionen in Hellgrau
        }

        // Text zentrieren
        const text = options[i];
        const textWidth = GameDep.ctx.measureText(text).width;
        GameDep.ctx.fillText(text, optionCenterX - textWidth / 2, optionCenterY);
    }

    GameDep.ctx.restore();
}
