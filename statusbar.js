
export default class Statusbar {
    constructor(GameDep) {
    this.GameDep = GameDep;
    }
    // draw1(lifePercent){
    //     // Statusbar-Position und Größe
    //     const barX = 20;
    //     const barY = 20;
    //     const barWidth = 300;
    //     const barHeight = 30;
    //
    //     // Hintergrund der Statusleiste
    //     this.GameDep.ctx.fillStyle = "#555"; // Grau
    //     this.GameDep.ctx.fillRect(barX, barY, barWidth, barHeight);
    //
    //     // Gefüllte Lebensleiste
    //     const lifeWidth = (lifePercent / 100) * barWidth; // Breite basierend auf Prozent
    //     this.GameDep.ctx.fillStyle = lifePercent > 50 ? "#0f0" : lifePercent > 20 ? "#ff0" : "#f00"; // Grün, Gelb, Rot
    //     this.GameDep.ctx.fillRect(barX, barY, lifeWidth, barHeight);
    //
    //     // Rahmen der Statusleiste
    //     this.GameDep.ctx.strokeStyle = "#000"; // Schwarz
    //     this.GameDep.ctx.lineWidth = 2;
    //     this.GameDep.ctx.strokeRect(barX, barY, barWidth, barHeight);
    //
    //     // Lebenswert als Text
    //     this.GameDep.ctx.fillStyle = "#fff"; // Weiß
    //     this.GameDep.ctx.font = "16px Arial";
    //     this.GameDep.ctx.fillText(`${lifePercent}%`, barX + barWidth / 2 - 15, barY + barHeight - 7);
    //
    // }

    draw(hitpoint,maxHitpoint) {
        if (hitpoint <= 0) {
            hitpoint = 0
        }
        // Position und Dimension des Lebensbalkens
        const x = 20;   // Abstand vom linken Rand
        const y = 20;   // Abstand vom oberen Rand
        const barWidth = 300; // Breite des Balkens
        const barHeight = 30; // Höhe des Balkens

        // Hintergrund des Balkens (grau)
        this.GameDep.ctx.fillStyle = "#555";
        this.GameDep.ctx.fillRect(x, y, barWidth, barHeight);

        // Berechne den Anteil der aktuellen HP
        // (Stelle sicher, dass newEnemy.maxHitpoint definiert ist!)
        const healthPercentage = hitpoint / maxHitpoint;
        const filledWidth = barWidth * healthPercentage;

        // Zeichne den gefüllten Teil des Lebensbalkens (grün)
        this.GameDep.ctx.fillStyle = "#0f0";
        this.GameDep.ctx.fillRect(x, y, filledWidth, barHeight);

        // Zeichne einen Rahmen um den Lebensbalken
        this.GameDep.ctx.lineWidth = 2;
        this.GameDep.ctx.strokeStyle = "#000";
        this.GameDep.ctx.strokeRect(x, y, barWidth, barHeight);

        // Optional: Zeige den Text "HP: aktueller Wert / Maximalwert" im Balken an
        this.GameDep.ctx.fillStyle = "#000";
        this.GameDep.ctx.font = "16px Arial";
        const hpText = `HP: ${hitpoint} / ${maxHitpoint}`;
        this.GameDep.ctx.fillText(hpText, x + 10, y + barHeight - 7);
    }

}