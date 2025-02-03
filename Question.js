import {GameDep, items, runJS} from "./main";

class Question {

    constructor(data) {

        this.data = data;
    }

    openWindowsQuestion() {
        if (GameDep.gameStatus === 1) {
            if (!GameDep.questTriggered) {
                (async () => {
                    try {
                        const quest = await this.data.getQuest(); // Promise auflösen
                        const jsonString = JSON.stringify(quest, null, 2); // JSON-String mit Formatierung
                        GameDep.takeQuest = jsonString
                    } catch (error) {
                        console.error('Fehler:', error);
                    }
                })();
            }
            items.findBook(GameDep.takeQuest)
            GameDep.questTriggered = true;
            clearInterval(GameDep.intervalId);
        }
    }

    checkAnswer(event) {
        if (event.target.classList.contains('answer')) {

            let control = "answer" + items.correctAnswer
            if (control === event.target.id) {
                GameDep.exPoints = 15;
                console.log(`Richtige Antwort`);
            }
        }
        GameDep.setGameStatus(3)
        GameDep.questTriggered = false;
        overlay.style.display = 'none';
        GameDep.intervalId = setInterval(runJS, 100);
    }

}