export default class SaveGame{

    constructor() {
    }
    savegame(GameDep, player, field, neighbors, items, attack, enemy, question)
    {
        // this.GameDep = GameDep;
        // this.player = player;
        // this.field = field;
        // this.items = items;
        // this.attack = attack;
        // this.enemy = enemy;

        const saveGameDep = JSON.stringify(GameDep);
        localStorage.setItem("GameDep", saveGameDep);
        const savePlayer = JSON.stringify(player);
        localStorage.setItem("Player", savePlayer);
        const saveField = JSON.stringify(field);
        localStorage.setItem("Field", saveField);
        const saveItem = JSON.stringify(items);
        localStorage.setItem("Item", saveItem);
        const saveAttack = JSON.stringify(attack);
        localStorage.setItem("Attack", saveAttack)
        const saveEnemy = JSON.stringify(enemy);
        localStorage.setItem("Enemy", saveEnemy);



    }
    loadGame(){



    }



}