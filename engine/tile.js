export default class Tile {

    constructor(givenValue){
        //generate number for tile -- either 2 or 4 with probabilities
        if(givenValue == 0){
            let random = Math.random();
            if(random <= .1) {
                this.value = 4;
            } else {
                this.value = 2;
            }
        } else {
            this.value = givenValue;
        }

        this.hasMoved = false;
    }

    increaseValue() {
        this.value = this.value*2;
        this.hasMoved = true;
        return this.value;
    }
    getValue() {
        return this.value;
    }

}