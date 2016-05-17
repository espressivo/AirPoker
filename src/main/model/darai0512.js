'use strict';
import ModelInterface from './airpokermodel.js'

export default class Model extends ModelInterface {
  constructor() {
    super('darai0512');
  }
  setCard(hands, remainingCardCandidates) {
    return hands[0];
  }
  rankFlag() {
    return true;
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
