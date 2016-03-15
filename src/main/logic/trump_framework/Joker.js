'use strict';
import {Card} from "./card.js";

export default class Joker extends Card {
    /**
     * Sets joker
     * @member int number
     * @member str suit 
     */
    constructor() {
        super(0, 'JOKER');
        if (this.suit || this.number) {
            throw 'ERROR: invalid Jocker value.';
        }
    }
    //transform(number, suit) {
    //    super(number, suit);
    //}
}
