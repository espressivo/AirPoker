'use strict';
import {Card} from "./card.js";

export default class Joker extends Card {
  constructor() {
    super(null, null);
  }

  /**
   * turnInto
   *  Turns this joker into a Card obj
   * @member int number
   * @member str suit
   */
  turnInto(number, suit) {
    this.setNumber_(number);
    this.setSuit_(suit);
  }
}
