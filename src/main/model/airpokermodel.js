'use strict';
export default class ModelInterface {
  constructor(modelerName) {
    this.name = modelerName;
  }
  setCard(hands, remainingCardCandidates) {
    throw new Error('Implement me');
  }
  rankFlag() {
    throw new Error('Implement me');
  }
  bet(preAction, myTips, maxRaise) {
    throw new Error('Implement me');
  }
}
