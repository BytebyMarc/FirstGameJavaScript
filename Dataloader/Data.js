
export default class Data{

    constructor () {
        this.quest = []
        this.quest.push({ID: 0, quest: "Überschrift", questText: "Hier ist der text der Quest"})
       // this.quest.push({ID: 1, quest: "Überschrift1", questText: "Hier ist der text der Quest"})
    }
getQuest() {
 return this.quest[0]
}



}
