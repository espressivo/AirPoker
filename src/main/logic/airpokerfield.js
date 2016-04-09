'use strict';
import Field from './trump_framework/field.js';
import {Numbers, Suits} from './trump_framework/card.js';

export default class AirPokerField extends Field {
  constructor() {
    super();
    this.field = {};
    this.sideField = {};
    Object.keys(Numbers).forEach(function(num) {
      this[num] = Object.keys(Suits);
    }, this.sideField);
  }

  /*
   * @param  obj card => Card or Joker class object
   */
  set(playerName, number) {
    this.field[playerName] = number;
  }

  view() {
    return this.field;
  }

  back(card) {
    const indexNum = this.field.indexOf(card);
    this.field.splice(indexNum, 1);
    return card;
  }

  trash() {
    const trashCards = this.field.concat();
    this.field = [];
    return trashCards;
  }
}
