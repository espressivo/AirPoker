'use strict';

import {Card, Suits, Numbers} from "./Card.js";
/*
 * Creates Card class in only this class.
 */ 
export default class Field {
    constructor(setup) {
    }

    /*
     * テーブルに置かれたカードをどのように扱うかは、サブクラスで実装する。
     * @param  obj card => Card or Joker class object
     * @return obj drawCard => the same card as param, or at random if param is nothing.
     */
    setCard(card) {
    }
    // テーブルに置かれたカードを表す配列
    viewField() {

    }
    trash(card) {

    }
}
