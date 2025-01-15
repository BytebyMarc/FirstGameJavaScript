export default class Neighbors{
    constructor(GameDependencies) {
        this.howManyBoxes = GameDependencies.howManyBoxes;
    }
    calculate(fieldID){
        let north = fieldID - this.howManyBoxes
        let south = fieldID + this.howManyBoxes
        let west = fieldID - 1
        let east = fieldID + 1

        if (fieldID < this.howManyBoxes) {
            north = null
        }
        for (let i = 0; i < this.howManyBoxes; i++) {
            if (fieldID === this.howManyBoxes * i) {
                west = null
            }
        }
        for (let i = 0; i < this.howManyBoxes; i++) {
            if (fieldID === this.howManyBoxes * i - 1) {
                east = null
            }
        }
        if (fieldID === this.howManyBoxes * this.howManyBoxes - 1) {
            south = null
            east = null
        }
        if (fieldID >= this.howManyBoxes * this.howManyBoxes - this.howManyBoxes) {
            south = null
        }
        this.north = north;
        this.south = south;
        this.west = west;
        this.east = east;
        console.log("FieldID: " + fieldID+ " North: " + north + " South: " + south + " West: " +west+  " East: " + east);
    }
    getSouth(fieldID)
    {
        this.calculate(fieldID)
        return this.south;
    }
    getNorth(fieldID){
        this.calculate(fieldID)
        return this.north;
    }
    getWest(fieldID){
        this.calculate(fieldID)
        return this.west;
    }
    getEast(fieldID){
        this.calculate(fieldID)
        return this.east;
    }

}