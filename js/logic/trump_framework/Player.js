//import  from "./.js";
export default class Player {
    constructor(baseInfo) {
        this.name = baseInfo;
        this.turn = baseInfo;
        this.hand_ = new Array();
    }
    receive(card) {
        this.hand_.push(card);
    }
    trash(card) {
        let indexNum;
        if (typeof card == 'undefined') {
            indexNum = Math.floor(Math.random() * this.hand_.length);
        } else {
            indexNum = this.hand_.indexOf(card);
        }
        let trashCard = card || this.hand_[indexNum];
        this.hand_.splice(indexNum, 1);
        return trashCard;
    }
}
