export function mousePositionEvent(canvas, mousePosDisplay) {
    return (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        mousePosDisplay.textContent = `${mouseX.toFixed(0)}, ${mouseY.toFixed(0)}`;
    };
}

export function mouseClickHandler(player, GameDep) {

    return (event) => {
        const rect = GameDep.canvas.getBoundingClientRect();
        const mouseClickX = event.clientX - rect.left;
        const mouseClickY = event.clientY - rect.top;

        function setColor(x, y) {
            GameDep.ctx.fillRect(arrayGrid[x][y].gridX, arrayGrid[x][y].gridY, GameDep.fieldSizeX, GameDep.fieldSizeX);
            arrayGrid[x][y].color = arrayGrid[x][y].color === 1 ? 2 : 1;
        }

        outerLoop:
            for (let i = 0; i < GameDep.howManyBoxes; i++) {
                for (let j = 0; j < GameDep.howManyBoxes; j++) {
                    // Vertikale Überprüfung letzte Reihe
                    if (GameDep.canvas.height - GameDep.fieldSizeX < mouseClickX && arrayGrid[i][j].gridY > mouseClickY) {
                        setColor(i - 1, arrayGrid.length - 1);
                        player.setLastPositionID(arrayGrid[i - 1][arrayGrid.length - 1].ID);
                        break outerLoop;
                    }
                    // Rechte untere Ecke
                    if (GameDep.canvas.width - GameDep.fieldSizeX < mouseClickX && GameDep.canvas.height - GameDep.fieldSizeY < mouseClickY) {
                        setColor(arrayGrid.length - 1, arrayGrid.length - 1);
                        player.setLastPositionID(arrayGrid[GameDep.howManyBoxes - 1][GameDep.howManyBoxes - 1].ID);
                        break outerLoop;
                    }
                    // Horizontale Überprüfung letzte Reihe
                    if (arrayGrid[i][j].gridX > mouseClickX && GameDep.canvas.height - GameDep.fieldSizeY < mouseClickY) {
                        setColor(arrayGrid.length - 1, j - 1);
                        player.setLastPositionID(arrayGrid[arrayGrid.length - 1][j - 1].ID);
                        break outerLoop;
                    }
                    // Alle anderen Felder
                    if (arrayGrid[i][j].gridX > mouseClickX && arrayGrid[i][j].gridY > mouseClickY) {
                        setColor(i - 1, j - 1);
                        player.setLastPositionID(arrayGrid[i - 1][j - 1].ID);
                        break outerLoop;
                    }
                }
            }
    };
}
