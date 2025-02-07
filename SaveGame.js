export function saveGame(GameDep, player, field, items, attack, enemy)
{
    const saveGameDep = JSON.stringify(GameDep);
    localStorage.setItem("GameDep", saveGameDep);
    const savePlayer = JSON.stringify(player);
    localStorage.setItem("Player", savePlayer);
    const saveField = JSON.stringify(field);
    localStorage.setItem("FieldC", saveField);
    const saveItem = JSON.stringify(items);
    localStorage.setItem("Item", saveItem);
    //const saveAttack = JSON.stringify(attack);
    //localStorage.setItem("Attack", saveAttack)
    const saveEnemy = JSON.stringify(enemy);
    localStorage.setItem("Enemy", saveEnemy);
}


