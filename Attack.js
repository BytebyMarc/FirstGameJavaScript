import {attack, player, enemy, field, GameDep} from "./main.js";
import {enableArrowKeys, disableArrowKeys, disableAttackKeyHandlers, enableAttackKeyHandlers, } from "./events/keyHandler.js";

export default class Attack {
    constructor(GameDep, player) {
        this.gameStatus = GameDep.gameStatus;
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.intervalId = GameDep.intervalId;
        this.enemy = {}
        this.switchMenu = "Start"
        this.playerAttack1 = player.attack1
        this.playerAttack2 = player.attack2
        this.playerAttack3 = player.attack3
        this.playerAttack4 = player.attack4
        this.ctx.shadowColor = "rgba(0,0,0, 0.7)";
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        this.ctx.fillStyle = "#D3D3D3";
        this.selectedMenuIndex = 0

    }
    openWindowAttack(enemy) {
        this.enemy = enemy
        if (GameDep.gameStatus === 4) {
            disableArrowKeys()
            enableAttackKeyHandlers()
            clearInterval(GameDep.intervalId);
            GameDep.intervalId = setInterval(this.attackJS.bind(this), 100);
            console.log(enemy);
        }
        else {
            //  disableAttackKeyHandlers()      //  enableArrowKeys()
        }
    }
    attackJS(){
        GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
        field.draw();
        this.drawRoundedRect(this.ctx, 50, 50, 700, 700, 15);
        if(this.selectedMenuIndex ===0 || this.selectedMenuIndex ===1){
            this.drawBattleMenu()
        }
        if(this.selectedMenuIndex === 4)
        {
            this.drawAttackMenu()
        }
        this.drawHealthBar(80,80,enemy.enemyList[0].hitpoint,enemy.enemyList[0].maxHitpoint)
        this.drawHealthBar(400,580,player.lifePoints,150)
        this.drawEnemyImage()
        this.drawPlayerImage()

    }


    drawRoundedRect(ctx, x, y, width, height, radius) {
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

    drawBattleMenu() {
        const menuMargin = 50;
        const menuWidth = 800 - 2 * menuMargin; // 700px Breite
        const menuHeight = 100;                 // Menü-Höhe (anpassbar)
        const menuX = menuMargin;
        const menuY = 800 - menuMargin - menuHeight;
        this.ctx.save();

        // Hintergrund des Menüs (ein abgesetzter, abgerundeter Kasten)
        this.ctx.fillStyle = "#003366"; // dunkles Blau für den Hintergrund
        this.drawRoundedRect(this.ctx, menuX, menuY, menuWidth, menuHeight, 10);

        // Rahmen um das Menü
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();

        // Menüoptionen: "Item" und "Attacken"
        const options = ["Item", "Attacken"];
        const optionCount = options.length;
        const optionWidth = menuWidth / optionCount;
        this.ctx.font = "bold 24px Arial";
        this.ctx.textBaseline = "middle";

        // Zeichne die einzelnen Menüoptionen
        for (let i = 0; i < optionCount; i++) {
            let optionX = menuX + i * optionWidth;
            let optionCenterX = optionX + optionWidth / 2;
            let optionCenterY = menuY + menuHeight / 2;

            // Wenn diese Option ausgewählt ist, wird ein halbtransparentes Highlight gezeichnet
            if (this.selectedMenuIndex === i) {
                this.ctx.save();
                this.ctx.fillStyle = "#fff";
                this.ctx.globalAlpha = 0.3;
                this.ctx.fillRect(optionX, menuY, optionWidth, menuHeight);
                this.ctx.restore();
                this.ctx.fillStyle = "#fff"; // Ausgewählte Option in Weiß
            } else {
                this.ctx.fillStyle = "#ccc"; // Unausgewählte Optionen in Hellgrau
            }
            // Text zentrieren
            const text = options[i];
            const textWidth = this.ctx.measureText(text).width;
            this.ctx.fillText(text, optionCenterX - textWidth / 2, optionCenterY);
        }
        this.ctx.restore();
    }

drawAttackMenu(enemy){
    this.drawRoundedRect(this.ctx, 50, 50, 700, 700, 15);
    const menuMargin = 50;
    const menuWidth = 800 - 2 * menuMargin; // 700px Breite
    const menuHeight = 150;                // Menü-Höhe (anpassbar)
    const menuX = menuMargin;
    const menuY = 800 - menuMargin - menuHeight;
    this.ctx.save();
    // Hintergrund des Attack-Menüs – z. B. ein dunkles Rot, damit es sich farblich abhebt
    this.ctx.fillStyle = "#660000";
    this.drawRoundedRect(this.ctx, menuX, menuY, menuWidth, menuHeight, 10);
    // Rahmen um das Menü
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#fff";
    this.ctx.stroke();
    // Hole die Angriffsoptionen aus dem newEnemy-Objekt
    const attackOptions = [
        this.playerAttack1,
        this.playerAttack2,
        this.playerAttack3,
        this.playerAttack4
    ];
    // Falls noch nicht vorhanden, initialisiere den ausgewählten Index
    if (this.selectedAttackIndex === undefined) {
        this.selectedAttackIndex = 0;
    }
    // Zeichne die Angriffsoptionen als vertikale Liste
    const optionX = menuX + 20;
    let optionY = menuY + 20;
    const lineHeight = 35; // Abstand zwischen den Optionen
    this.ctx.font = "bold 20px Arial";
    this.ctx.textBaseline = "top";
    for (let i = 0; i < attackOptions.length; i++) {
        let attackText = attackOptions[i] || "";
        // Wenn diese Option ausgewählt ist, zeichne ein Highlight-Hintergrund
        if (this.selectedAttackIndex === i) {
            this.ctx.save();
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            const textWidth = this.ctx.measureText(attackText).width;
            this.ctx.fillRect(optionX - 5, optionY - 5, textWidth + 10, 30);
            this.ctx.restore();
            this.ctx.fillStyle = "#fff"; // Ausgewählter Text in Weiß
        } else {
            this.ctx.fillStyle = "#ccc"; // Unausgewählte Optionen in Hellgrau
        }
        this.ctx.fillText(attackText, optionX, optionY);
        optionY += lineHeight;
    }
    this.ctx.restore();
   // console.log("attack menü")
}
drawItemMenu(){
    this.drawRoundedRect(this.ctx, 50, 50, 700, 700, 15);
    console.log("item menü")
}
drawHealthBar(xPos , yPos, hitpoint, maxHitpoint) {
        if(hitpoint <= 0)
        {
            hitpoint = 0
        }
        // Position und Dimension des Lebensbalkens
        const x = xPos;   // Abstand vom linken Rand
        const y = yPos;   // Abstand vom oberen Rand
        const barWidth = 300; // Breite des Balkens
        const barHeight = 30; // Höhe des Balkens

        // Beginne mit dem Zeichnen
        this.ctx.save();

        // Hintergrund des Balkens (grau)
        this.ctx.fillStyle = "#555";
        this.ctx.fillRect(x, y, barWidth, barHeight);

        // Berechne den Anteil der aktuellen HP
        // (Stelle sicher, dass newEnemy.maxHitpoint definiert ist!)
        const healthPercentage = hitpoint / maxHitpoint;
        const filledWidth = barWidth * healthPercentage;

        // Zeichne den gefüllten Teil des Lebensbalkens (grün)
        this.ctx.fillStyle = "#0f0";
        this.ctx.fillRect(x, y, filledWidth, barHeight);

        // Zeichne einen Rahmen um den Lebensbalken
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#000";
        this.ctx.strokeRect(x, y, barWidth, barHeight);

        // Optional: Zeige den Text "HP: aktueller Wert / Maximalwert" im Balken an
        this.ctx.fillStyle = "#000";
        this.ctx.font = "16px Arial";
        const hpText = `HP: ${hitpoint} / ${maxHitpoint}`;
        this.ctx.fillText(hpText, x + 10, y + barHeight - 7);

        this.ctx.restore();
    }
    drawEnemyImage() {
        // Positionierung: Der Lebensbalken befindet sich bei (50, 50) mit einer Höhe von 30.
        // Wir platzieren das Bild 20px unterhalb des Balkens.
        const imageX = 110;
        const imageY = 80 + 30 + 20; // 50 (oben) + 30 (Balkenhöhe) + 20 (Abstand)

        // Definiere die Größe des Bildes (anpassbar)
        const imageWidth = 250;
        const imageHeight = 250;

        // Prüfen, ob das Bild bereits geladen wurde.
        if (this.enemyImage) {
            this.ctx.drawImage(this.enemyImage, imageX, imageY, imageWidth, imageHeight);
        } else {
            // Falls das Bild noch nicht geladen wurde, erstellen wir ein neues Image-Objekt
            this.enemyImage = new Image();
            // Bitte passe den Pfad zur Bilddatei an
            this.enemyImage.src = "assets/magier.png";
            // Sobald das Bild geladen ist, wird es gezeichnet.
            this.enemyImage.onload = () => {
                this.ctx.drawImage(this.enemyImage, imageX, imageY, imageWidth, imageHeight);
            };
        }

    }

    drawPlayerImage() {
        // Positionierung: Der Lebensbalken befindet sich bei (50, 50) mit einer Höhe von 30.
        // Wir platzieren das Bild 20px unterhalb des Balkens.
        const imageX = 420;
        const imageY = 320; // 50 (oben) + 30 (Balkenhöhe) + 20 (Abstand)

        // Definiere die Größe des Bildes (anpassbar)
        const imageWidth = 250;
        const imageHeight = 250;

        // Prüfen, ob das Bild bereits geladen wurde.
        if (this.playerImage) {
            this.ctx.drawImage(this.playerImage, imageX, imageY, imageWidth, imageHeight);
        } else {
            // Falls das Bild noch nicht geladen wurde, erstellen wir ein neues Image-Objekt
            this.playerImage = new Image();
            // Bitte passe den Pfad zur Bilddatei an
            this.playerImage.src = "assets/dragon.png";
            // Sobald das Bild geladen ist, wird es gezeichnet.
            this.playerImage.onload = () => {
                this.ctx.drawImage(this.playerImage, imageX, imageY, imageWidth, imageHeight);
            };
        }

    }






}