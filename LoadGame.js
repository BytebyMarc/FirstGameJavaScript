import GameDependencies from "./GameDependencies";
import Player from "./Player";
import Field from "./Field";
import Neighbors from "./Neighbors";
import Items from "./Items";
import Attack from "./Attack";
import Enemy from "./Enemy";
import Data from "./Dataloader/Data";
import Question from "./Question";
import EventManager from "./events/EventManager";
import Statusbar from "./statusbar";

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
