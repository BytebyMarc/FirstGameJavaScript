
export default class Data{

    constructor () {
        this.quest = 0

    }
getQuest() {
        return fetch('Dataloader/Datenbank.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ID_Question: 1 }),
        })
            .then(response => response.text()) // Text statt JSON prüfen
            .then(data => {
                console.log('Raw Response:', data); // Gibt die rohe Antwort aus
                try {
                     // Versucht, JSON zu parsen
                    return JSON.parse(data);
                    //console.log('Parsed Data:', parsedData);
                } catch (e) {
                    console.error('Fehler beim Parsen der Antwort:', e);
                }
            })
            .catch(error => {
                console.error('Fehler:', error);
            });

}


}
