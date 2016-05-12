'use strict';
export default class Model {
  constructor() {
    // init
    this.name = 'darai0512';
  }
  select(hands, remainingCardCandidates) {
    return hands[0];
  }
  bet(preAction, myTips, maxRaise) {
    let bet = {'action': null, tip: 0};
    if (preAction == null || preAction === 'check') {
      bet.action = 'check';
    } else {
      bet.action = 'call';
    }
    return bet;
  }
}