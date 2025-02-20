import {GameDep, field, player, attack} from "../GameDataObjekts/LoadGame.js";
import {disableArrowKeys, enableAttackKeyHandlers, } from "../events/keyHandler.js";

export default class Attack {
    constructor(GameDep, player) {
        this.gameStatus = GameDep.gameStatus;
        this.ctx = GameDep.ctx;
        this.fieldSizeX = GameDep.fieldSizeX;
        this.fieldSizeY = GameDep.fieldSizeY;
        this.intervalId = GameDep.intervalId;
        this.tileImage = GameDep.tileImages;
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
        this.enemyImage = ""

    }
    openWindowAttack() {
        if (GameDep.gameStatus === 4) {
            GameDep.keyState = {};
            disableArrowKeys()
            enableAttackKeyHandlers()
            clearInterval(GameDep.intervalId);
            GameDep.intervalId = setInterval(this.attackJS.bind(this), 100);
        }
        else {
            //  disableAttackKeyHandlers()      //  enableArrowKeys()
        }
    }
    attackJS(){

        GameDep.ctx.clearRect(0, 0, GameDep.canvasWidth, GameDep.canvasHeight);
        field.draw();
        this.drawRoundedRectBackground(this.ctx, 50, 50, 700, 700, 15);
        if(this.selectedMenuIndex ===0 || this.selectedMenuIndex ===1){
            this.drawBattleMenu()
        }
        if(this.selectedMenuIndex === 4)
        {
            this.drawAttackMenu()
        }
        if(this.selectedMenuIndex === 5){
            //item menü anzeigen
            this.drawItemMenu()
        }
        this.drawHealthBar(70,70,attack.enemy.hitpoint,attack.enemy.maxHitpoint)
        this.drawHealthBar(400,700,player.lifePoints,150)
        this.drawEnemyImage()
        this.drawPlayerImage()

    }


    drawRoundedRectBackground(ctx, x, y, width, height, radius) {
        ctx.save()
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
        ctx.clip()
        if (this.backgroundImage) {
            ctx.drawImage(this.backgroundImage, x, y, width, height);
        } else {
            this.backgroundImage = new Image();
            this.backgroundImage.src = "assets/battelBackground.png";
            this.backgroundImage.onload = () => {
                ctx.drawImage(this.backgroundImage, x, y, width, height);
            };
        }
        ctx.restore();
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
        ctx.clip();
       }

    drawBattleMenu() {
        const menuMargin = 30;
        const menuWidth = 200 - 2 * menuMargin; // 700px Breite
        const menuHeight = 100; // Erhöhte Höhe für vertikales Layout
        const menuX = 80;
        const menuY = 800 - menuMargin - menuHeight -100;
        const optionHeight = menuHeight / 2; // Höhe für jede Menüoption

        this.ctx.save();

        // Hintergrund des Menüs (abgerundeter Kasten)
        this.ctx.fillStyle = "#003366"; // Dunkelblau für den Hintergrund
        this.drawRoundedRect(this.ctx, menuX, menuY, menuWidth, menuHeight, 10);

        // Rahmen um das Menü
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();

        // Menüoptionen: "Item" und "Attacken"
        const options = ["Attacken", "Item"];
        this.ctx.font = "bold 24px Arial";
        this.ctx.textBaseline = "middle";

        // Zeichne die einzelnen Menüoptionen übereinander
        for (let i = 0; i < options.length; i++) {
            let optionY = menuY + i * optionHeight;
            let optionCenterX = menuX + menuWidth / 2;
            let optionCenterY = optionY + optionHeight / 2;

            // Wenn diese Option ausgewählt ist, wird ein halbtransparentes Highlight gezeichnet
            if (this.selectedMenuIndex === i) {
                this.ctx.save();
                this.ctx.fillStyle = "#fff";
                this.ctx.globalAlpha = 0.3;
                this.ctx.fillRect(menuX, optionY, menuWidth, optionHeight);
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
    const menuMargin = 30;
    const menuWidth = 280 - 2 * menuMargin; // 700px Breite
    const menuHeight = 150; // Erhöhte Höhe für vertikales Layout
    const menuX = 80;
    const menuY = 800 - menuMargin - menuHeight -100;

    this.ctx.save();
    this.ctx.fillStyle = "#660000";
    this.drawRoundedRect(this.ctx, menuX, menuY, menuWidth, menuHeight, 10);
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

    drawItemMenu() {
        const menuMargin = 30;
        const menuWidth = 280 - 2 * menuMargin; // Beispiel: 220px
        const menuHeight = 150;
        const menuX = 80;
        const menuY = 800 - menuMargin - menuHeight - 100;
        const maxVisibleItems = 3; // Maximal 3 Items gleichzeitig sichtbar
        const lineHeight = 50;  // Höhe pro Item-Eintrag

        this.ctx.save();
        this.ctx.fillStyle = "#004400";
        this.drawRoundedRect(this.ctx, menuX, menuY, menuWidth, menuHeight, 10);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();

        if (this.selectedItemIndex === undefined) {
            this.selectedItemIndex = 0;
        }

        const totalItems = player.bag.length;

        const visibleItems = Math.min(totalItems, maxVisibleItems);


        let startIndex = 0;
        if (totalItems > maxVisibleItems) {
            startIndex = Math.min(
                Math.max(this.selectedItemIndex - (maxVisibleItems - 1), 0),
                totalItems - maxVisibleItems
            );
        }
        let endIndex = startIndex + visibleItems;

        const optionX = menuX + 20;
        let optionY = menuY + 20;

        this.ctx.font = "bold 20px Arial";
        this.ctx.textBaseline = "top";

        // Durchlaufe alle sichtbaren Items und zeichne sie
        for (let i = startIndex; i < endIndex; i++) {
            let item = player.bag[i];
            if (!item) continue;

            // Wenn das Item aktuell ausgewählt ist, zeichne einen Highlight-Hintergrund
            if (this.selectedItemIndex === i) {
                this.ctx.save();
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                this.ctx.fillRect(optionX - 5, optionY - 5, menuWidth - 40, 40);
                this.ctx.restore();
                this.ctx.fillStyle = "#fff";
            } else {
                this.ctx.fillStyle = "#ccc";
            }

            // Zeichne den Item-Namen (rechts neben dem Bild)
            this.ctx.fillText(item.name, optionX + 40, optionY + 10);

            // Zeichne das Item-Bild, falls es geladen ist.
            if (this.tileImage[item.name] && this.tileImage[item.name].complete) {
                this.ctx.drawImage(this.tileImage[item.name], optionX, optionY, 30, 30);
            }

            optionY += lineHeight;
        }

        // Zeichne eine Scrollbar, wenn es mehr Items als sichtbare Einträge gibt
        if (totalItems > maxVisibleItems) {
            const scrollbarHeight = (maxVisibleItems / totalItems) * menuHeight;
            const maxStartIndex = totalItems - maxVisibleItems;
            const scrollbarY = menuY + ((startIndex / maxStartIndex) * (menuHeight - scrollbarHeight));

            this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this.ctx.fillRect(menuX + menuWidth - 10, scrollbarY, 5, scrollbarHeight);
        }

        this.ctx.restore();
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
            if(attack.enemy.name === "MAGIER") {
                this.enemyImage.src = "assets/magier.png";
            }
            if(attack.enemy.name === "ZAUBERER") {
                this.enemyImage.src = "assets/zauberer.png";
            }
            if(attack.enemy.name === "MONSTER") {
                this.enemyImage.src = "assets/monster1.png";
            }
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
        const imageY = 420; // 50 (oben) + 30 (Balkenhöhe) + 20 (Abstand)

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