import {GameDep, items, player} from "../GameDataObjekts/LoadGame.js";
import {runJS} from "../main.js";

export default class Question {
    constructor(data) {
        this.data = data;
    }

    openWindowsQuestion() {
        if (GameDep.gameStatus === 1 && GameDep.questTriggered === false) {
            (async () => {
                try {
                    let jsonString = null; // Initialisierung außerhalb
                    do {
                        const quest = await this.data.getQuest(); // Promise auflösen
                        if (quest) {
                            jsonString = JSON.stringify(quest, null, 2); // Nutze die bereits deklarierte Variable
                            GameDep.takeQuest = jsonString;
                            if (jsonString) {
                                GameDep.questTriggered = true;
                                console.log("trrretere");
                            }
                        } else {
                            console.log("WARNUNG");
                        }
                    } while (!jsonString && GameDep.questTriggered === false);
                } catch (error) {
                    console.error('Fehler:', error);
                }
            })();
        }
            if (GameDep.gameStatus === 1){
            items.findBook(GameDep.takeQuest)
            GameDep.questTriggered = true;
            clearInterval(GameDep.intervalId);
        }
    }

    checkAnswer(event) {
        if (event.target.classList.contains('answer')) {

            let control = "answer" + items.correctAnswer
            if (control === event.target.id) {

                player.setPlayerLifePoints(10)

                const index = items.itemList.findIndex(item => item.ID === items.itemTake.ID);
                items.itemList.splice(index, 1);

                // const index = items.itemList.findIndex(item => item.ID === player.getLastPositionID());
                // items.itemList.splice(index, 1);

                player.levelCalculator(5)
                console.log(`Richtige Antwort`);
                items.itemTake = undefined;
                GameDep.setGameStatus(0)
            }
        }
        GameDep.setGameStatus(3)
        GameDep.questTriggered = false;
        overlay.style.display = 'none';
        GameDep.intervalId = setInterval(runJS, 100);
    }

}