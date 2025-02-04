
export default class Data{

    constructor () {
        this.quest = 0

    }
    getQuest() {
        const randomID = Math.floor(Math.random() * 4) + 1;

        return fetch('Dataloader/Datenbank.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ID_Question: randomID }),
        })
            .then(response => response.text())
            .then(data => {
                try {
                    const obj = JSON.parse(data);
                    // Hier kannst du auch prüfen, ob ein Fehlerobjekt zurückgegeben wurde
                    if (obj.error) {
                        console.warn('Server meldet einen Fehler:', obj.error);
                        return null;  // Oder einen anderen definierten Wert
                    }
                    return obj;
                } catch (e) {
                    console.error('Fehler beim Parsen der Antwort:', e);
                    return null;  // Rückgabe eines definierten Wertes im Fehlerfall
                }
            })
            .catch(error => {
                console.error('Fehler beim Abruf:', error);
                return null;  // Auch hier einen definierten Rückgabewert setzen
            });
    }


}
