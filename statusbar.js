
export default class Statusbar {
    constructor(GameDep) {
    this.GameDep = GameDep;
    }
    draw(lifePercent){
        // Statusbar-Position und Größe
        const barX = 20;
        const barY = 20;
        const barWidth = 300;
        const barHeight = 30;

        // Hintergrund der Statusleiste
        this.GameDep.ctx.fillStyle = "#555"; // Grau
        this.GameDep.ctx.fillRect(barX, barY, barWidth, barHeight);

        // Gefüllte Lebensleiste
        const lifeWidth = (lifePercent / 100) * barWidth; // Breite basierend auf Prozent
        this.GameDep.ctx.fillStyle = lifePercent > 50 ? "#0f0" : lifePercent > 20 ? "#ff0" : "#f00"; // Grün, Gelb, Rot
        this.GameDep.ctx.fillRect(barX, barY, lifeWidth, barHeight);

        // Rahmen der Statusleiste
        this.GameDep.ctx.strokeStyle = "#000"; // Schwarz
        this.GameDep.ctx.lineWidth = 2;
        this.GameDep.ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Lebenswert als Text
        this.GameDep.ctx.fillStyle = "#fff"; // Weiß
        this.GameDep.ctx.font = "16px Arial";
        this.GameDep.ctx.fillText(`${lifePercent}%`, barX + barWidth / 2 - 15, barY + barHeight - 7);

    }

}