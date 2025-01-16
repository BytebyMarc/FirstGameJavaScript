
export default class Data{

    constructor () {
        this.quest = []
        this.quest.push({ID: 0, quest: "Welche Vorgehensmodelle solltest du im Projektmanagement, insbesondere in der Anwendungsentwicklung kenne?",
            questText: "Klassische Modelle\n" +
                "Wasserfallmodell\n" +
                "V-Modell\n" +
                "Spiralmodell\n" +
                "Agile Modelle\n" +
                "Scrum\n" +
                "-Kanban\n" +
                "Inkrementelles Vorgehensmodell\n" +
                "Extreme Programming\n"})

        this.quest.push({ID: 1, quest: "Was ist ein Netzplan im Projektmanagement?", questText: "Der Netzplan hilft bei der Terminplanung von Projekten und stellt die Dauer von Vorgängen im Gesamtprojekt grafisch dar.\n" +
                "Sowohl die zeitliche Anordnung als auch logische Abhängigkeiten zwischen den einzelnen Vorgängen werden mithilfe von Rechtecken dargestellt. Alle Vorgänge im Projekt werden als Pfad mit Pfeilen verbunden\n" +
                "Kritische Pfade und Pufferzeiten der einzelnen Vorgänge sowie Gesamtpufferzeiten sind im Netzplan jeweils gekennzeichnet. \n"})


        this.quest.push({ID: 1, quest: "Was ist ein Gantt-Diagramm?", questText: "In einem Gantt-Diagramm werden alle Aktivitäten eines Projektes mit Hilfe einer" +
                " Zeitachse dargestellt. Die Zeitachse wird horizontal in der ersten Zeile des Diagramms dargestellt. Alle Aktivitäten werden dann in den darunter liegenden Zeilen " +
                "in der ersten Spalte benannt und zeitlich mit einem waagerechten Balken dargestellt.  An der Länge der Balken kann die Dauer, der Beginn und das Ende der Aktivitäten" +
                " erkannt werden. Sich überschneidende Aktivitäten werden durch überlappende Balken dargestellt. Eine Visualisierung des kritischen Pfades ist möglich. Abhängigkeiten " +
                "zwischen den einzelnen Aktivitäten werden mit Hilfe von Pfeilen verdeutlicht.\n\n\n" +
                "Vorteile\n\n" +
                "Für kleine und mittlere Projekte sehr übersichtliche Darstellung der Aktivitäten\n\n\n" +
                "Nachteil\n" +
                "bei einer großen Anzahl von Aktivitäten wird die Darstellung schnell unübersichtlich\n"})



        //this.quest.push({ID: 1, quest: "Überschrift1", questText: "Hier ist der text der Quest"})
    }
getQuest() {
       let auswahl = Math.floor(Math.random() * this.quest.length);
 return this.quest[auswahl]
}



}
