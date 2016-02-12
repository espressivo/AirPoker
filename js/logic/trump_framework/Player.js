//import  from "./.js";
export default class Player {
    // handをprotected(=hand_)にしてopenHand() / countHand()を実装？
    // handが配列だと呼び出し側に意識させない作りにしたいので後で実装したい
    constructor(baseInfo) {
        this.name = baseInfo;
        this.turn = baseInfo;
        this.hand = new Array();
    }
    /*
     *  Gets a card
     */
    receive(card) {
        this.hand.push(card);
    }
    /*
     * Trashes(gives) a card at random or specified.
     */
    send(card) {
        let indexNum;
        if (typeof card == 'undefined') {
            indexNum = Math.floor(Math.random() * this.hand.length);
        } else {
            indexNum = this.hand.indexOf(card);
        }
        let trashCard = card || this.hand[indexNum];
        this.hand_.splice(indexNum, 1);
        return trashCard;
    }
}
