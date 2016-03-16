'use strict';

import {Card, Suits, Numbers} from "./card.js";
/*
 * Creates Card class in only this class.
 */ 
export default class Field {
    constructor() {
        this.field_ = new Array();
        this.trash_ = new Array();
    }

    /*
     * テーブルに置かれたカードをどのように扱うかは、サブクラスで実装する。
     * @param  obj card => Card or Joker class object
     * @return obj drawCard => the same card as param, or at random if param is nothing.
     */
    setCard(card) {
        throw 'Please override me.';
    }
    // テーブルに置かれたカードを表す配列
    view() {
        throw 'Please override me.';
    }
    trash(card) {
        // indexOf -> this.field.splice() -> this.trash_.push(card)
    }
    returnHand(player) {
             // typeof player == 'Player' // parent class check
             // indexOf -> this.field.splice()
             // player.receive(card);
    }
}
