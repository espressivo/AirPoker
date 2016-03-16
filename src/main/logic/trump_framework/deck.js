'use strict';

import {Card, Suits, Numbers} from "./card.js";
import Joker from "./joker.js";
/*
 * Creates Card class in only this class.
 * 'deck' array is not shuffled. When drawing, the card is selected at random every time. It is because this is client side program.
 */ 
export default class Deck {
    constructor(setup) {
        const {deck_num: deckNum, jocker_num: jockerNum} = setup;

        this.topCardIndex_ = null;
        this.deck_ = new Array();
        for (var i = 0;i < deckNum;i++) {
            Object.keys(Numbers).forEach(function(num) {
                Object.keys(Suits).forEach(function(suit) {
                    this.push(new Card(num, suit));
                }, this);
            }, this.deck_);
        }
        for (var j = 0;j < jockerNum;j++) {
            this.deck_.push(new Joker());
        }
    }

    /*
     * Gets a card.
     * @param  obj card => Card or Joker class object
     * @return obj drawCard => the same card as param, or at random if param is nothing.
     */
    draw(card) {
        let indexNum;
        if (typeof card == 'undefined') {
            indexNum = this.topCardIndex_ || Math.floor(Math.random() * this.deck_.length);
        } else {
            indexNum = this.deck_.indexOf(card);
        }
        let drawCard = this.deck_[indexNum];
        this.remove_(indexNum);
        this.topCardIndex_ = null;
        return drawCard;
    }

    /*
     * Checks the number of cards in this deck.
     * @return int the number of cards in this deck
     */
    checkNum() {
        return this.deck_.length;
    }

    /*
     * Sees a top card on this deck.
     * @return obj card => Card or Joker class object
     */
    showTop() {
        this.topCardIndex_ = this.topCardIndex_ || Math.floor(Math.random() * this.deck_.length);
        return this.deck_[this.topCardIndex_];
    }

    /*
     * Shuffles this deck.
     */
    shuffle() {
        this.topCardIndex_ = null;
    }

    remove_(indexNum) {
        this.deck_.splice(indexNum, 1);
    }
}
