'use strict';
/*
 * This class has only minimal functions.
 */
export default class Field {
  constructor() {
    this.latestSetPlayer = null;
    this.pool_ = [];
    this.trash_ = [];
  }

  /*
   * @param  obj card => Card or Joker class object
   */
  set(card, playerName) {
    this.pool_.push(card);
    this.latestSetPlayer = playerName;
  }

  view() {
    return this.pool_;
  }

  return(card) {
    if (typeof card == 'undefined') {
      let allCardsInPool = Object.assign([], this.pool_);
      this.pool_ = [];
      return allCardsInPool;
    } else {
      this.pool_.splice(this.pool_.indexOf(card), 1);
      return card;
    }
  }

  trash(card) {
    this.trash_.push(card);
  }
}
