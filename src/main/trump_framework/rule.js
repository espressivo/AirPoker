import Deck from "./deck.js"
import Player from './player.js';

/**
 * Defines trump rule
 */
export default class Rule {
  // setPlayers' order decide player's turn
  constructor(setDeck, setPlayers) {
    this.deck = new Deck(setDeck);
    this.players = [];
    for (let i=0; i < setPlayers.length; i++) {
      // @todo :array index order by bet turn
      let setPlayer = setPlayers[i];
      this.players[setPlayer.name] = new Player(setPlayer.name, setPlayer.options);
    }
  }

  /**
   * initHand
   *   Deals out <initNum> cards to each player.
   *
   *   @param  str playerName
   *   @param  int initHandNum
   */
  initHand(playerName, initHandNum) {
    if (initHandNum <= 0) {return;}
    for (let j = 0; j < initHandNum; j++) {
      this.players[playerName].receive(this.deck.draw());
    }
  }

  /**
   * findCandidates
   *   Finds cards to be able to put on the table from Player's hand and Table.
   *
   *   @param  str playerName
   *   @return arr candidates
   */
  findCandidates(playerName) {
    throw new Error('Implement me');
  }

  setField(playerName, card, options) {
    throw new Error('Implement me');
  }

  // not required??
  bet(playerName, action, tip) {
    throw new Error('Implement me');
  }

  judge() {
    throw new Error('Implement me using win_()');
  }

  win_() {
    throw new Error('Implement me');
  }
}
