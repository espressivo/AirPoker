'use strict';
import {Card} from "./card.js";

export default class Joker {
  constructor() {
    this.number;
    this.suit;
  }

  /**
   * turnInto
   *  Turns this joker into a Card obj
   * @member int number
   * @member str suit
   */
  turnInto(number, suit) {
    const joker = new Card(number, suit);
    this.number = joker.number;
    this.suit = joker.suit;
  }
}
