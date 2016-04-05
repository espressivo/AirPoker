'use strict';
/*
 * This class has only minimal functions. Please override me if you need.
 */
export default class Field {
  constructor() {
    this.field;
  }

  /*
   * @param  obj card => Card or Joker class object
   */
  set(card) {
    throw new Error('Implement me.');
  }

  view() {
    throw new Error('Implement me.');
  }

  /*
   * @param  obj card => Card or Joker class object
   */
  back(card) {
    throw new Error('Implement me.');
  }

  trash() {
    throw new Error('Implement me.');
  }
}
