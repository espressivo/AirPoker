'use strict';
export default class Player {
  constructor({name: name, turn: turn, tip: tip}) {
    this.name = name;
    this.turn = turn;
    this.tip = tip;
    this.hand_ = [];
  }

  /*
   *  Gets a card
   */
  receive(card) {
    this.hand_.push(card);
  }

  viewHand() {
    return this.hand_;
  }

  /*
   * Trashes(or Gives) a card at random or specified.
   */
  send(card) {
    let indexNum;
    if (typeof card == 'undefined') {
      indexNum = Math.floor(Math.random() * this.hand_.length);
    } else {
      indexNum = this.hand_.indexOf(card);
    }
    this.hand_.splice(indexNum, 1); //trash
    return card || this.hand_[indexNum];
  }
}
