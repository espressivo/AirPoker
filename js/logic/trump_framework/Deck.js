import Card from "./Card.js"
/*
 * Creates Card class in only this class.
 */ 
export default class Deck {
    constructor(setup) {
        [this.deckNum, this.jockerNum] = setup;
        this.deck = this.initDeckObj_();
    }
    drawOf(cardPair) {
        this.remove_(cardPair);
        this.card = new Card(cardPair);
        return this.card;
    }
    drawRandom() {
        let cardNum = Math.floor( Math.random() * 13 ) + 1;
        return drawOf({"number": cardNum, "suit": "S"});
    }
    remove_(card) {

    }
    initDeckObj_() {
        let deck = new Object();
        deck['J'] = this.jockerNum;
        let suit = ['S', 'H', 'D', 'C'];
        for (var i = 1;i <= this.deckNum * 13;i++) {
            deck[i] = suit;
        }
        return deck;
    }
}
