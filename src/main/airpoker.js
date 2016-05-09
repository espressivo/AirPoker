'use strict';
import Rule from './trump_framework/rule.js';
import Field from './trump_framework/field.js';

/*
 * YourPoint = RankPoint + HighCard (+ SuitOrder <- in the future)
 *   HighCard is from 2 to 1(=14).
 *   Suit is from 1 to 4.
 */
const RANK_POINTS = {
  RoyalStraightFlush: 200,
  StraightFlush: 180,
  FourCard: 160,
  FullHouse: 140,
  Flush: 120,
  RoyalStraight: 100,
  Straight: 80,
  ThreeCard: 60,
  TwoPair: 40,
  OnePair: 20,
  HighCard: 0
};

export default class AirPocker extends Rule {
  constructor(yourName, model) {
    // init
    const setDeck = {deckNum: 1, JockerNum: 0};
    const setPlayers = [{name: yourName, options: {tip: 20}}, {name: model.name, options: {tip: 20}}];
    super(setDeck, setPlayers);

    this.model = model;
    // fieldの使い方は、poolとして、suitを計算する用途にする？
    this.field = new Field();
    this.remainingCardCandidates = this.deck.showRemains();
    // set hand
    const handNum = 5; //= Math.floor(this.deck.showRemains().length / 5 / setPlayers.length);
    for (let i = 0; i < setPlayers.length; i++) {
      this.initHand(setPlayers[i].name, handNum);
    }
  }

  /*
   * initHand
   *   @override
   *   Sums up five card numbers.
   *
   *   @param str playerName
   *   @param int initHandNum
   */
  initHand(playerName, initHandNum) {
    for (let j = 0; j < initHandNum; j++) {
      let sumup = 0;
      // Sums up five card numbers.
      for (let x = 0; x < 5; x++) {
        let card = this.deck.draw();
        sumup += Number(card.number);
      }
      this.players[playerName].receive(sumup);
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
    return this.players[playerName].viewHand();
  }

  /*
   * setField
   *   @override
   *   Sets card to field.
   *
   *   @param  str playerName
   *   @param  int card
   *   @return obj this.field
   */
  setField(playerName, card) {
    // set your card
    this.field.set(playerName, this.players[playerName].send(card));
    // set npc's card
    let npcCard = this.model.setField(this.players[this.model.name].viewHand(), this.remainingCardCandidates);
    this.field.set(this.model.name, this.players[this.model.name].send(npcCard));
    return this.field.view();
  }

  bet(playerName, tip, options) {
  }

  /*****************************
   * judge
   *   Compares their Poker rank.
   *   If both of ranks are the same, compare a highest number of the hand.
   *   Ace(1) is highest. Two(2) is lowest.
   *   If they are the same, draw.
   *
   *   Suit and the Second Number are not considered.
   *****************************/
  judge(maxRankFlags) {
    const field = this.field.view();
    let max = {rank: {name: '', point: 0}};
    for (let i=0;i < maxRankFlags.length;i++) {
      let {name: playerName, maxRankFlag: maxRankFlag} = maxRankFlags[i];
      let rankCandidates = this.getCombinations_(field[playerName]);
      if (maxRankFlag) {
        this.players[playerName].tip = this.players[playerName].tip - 3;
        for (let i=0;i < rankCandidates.length;i++) {
          let comb = rankCandidates[i];
          let rank = this.rankByNumbers_(comb);
          if (rank.name === 'Straight'
          || rank.name === 'RoyalStraight'
          || rank.name === 'HighCard') {
            //flush?
          }
          if (rank.point > max.rank.point) {
            max.comb = comb;
            max.rank = rank;
          }
        }
      } else {
        const index = Math.floor(Math.random() * rankCandidates.length);
        const rank = this.rankByNumbers_(rankCandidates[index]);
      }
      // delete cards from sideField
    }
    //if (!win_()) {this.filed.trash();}
    let trashCards = this.field.return();
    for (let j=0;j < trashCards.length;j++) {
      this.field.trash(trashCards[j]);
    }
    return {rank: max.rank, card: max.comb};
  }

  /**
   * getCombinations_
   *   Returns an array of five numbers to be the arguement number by summing them.
   *
   *   @param  int num
   *   @return obj combinations
   */
  getCombinations_(num) {
    let combinations = [];
    //let remainNums = this.field.sideField;
    if (num > 5 && num < 65) {
      for (let a = 1; a < num / 5; a++) {
        let max2 = num - a;
        for (let b = a; b <= max2 / 4; b++) {
          let max3 = max2 - b;
          for (let c = b; c <= max3 / 3; c++) {
            let max4 = max3 - c;
            for (let d = c; d <= max4 / 2; d++) {
              let e = max4 - d;
              if (e <= 13) {
                combinations.push([a, b, c, d, e]);
              }
            }
          }
        }
      }
    }
    return combinations;
  }

  /*****************************
   * rank
   *   Retruns the following Poker rank.
   *   And, adds one HighCard to the rank.
   *   Ace(1) is highest and Two(2) is lowest.
   *
   *   @param  obj cards = {number: int, suit: str}
   *   @return obj rank = {name: str, point: int}
   *****************************/
  rank_(cards) {
    let rank = this.isFlash_(cards) ? {name: 'Flush'} : {};
  }

  /*
   * rankByNumbers_
   *   @param  arr numbers
   *   @return obj rank
   */
  rankByNumbers_(numbers) {
    let rank = {point: 0, name: null};
    numbers.sort((a, b) => a - b);
    if (this.isStraight_(numbers)) {
      rank.name = 'Straight';
      rank.point = RANK_POINTS.Straight;
      // Adds highest number
      rank.point += numbers[0] === 1 ? 14 : numbers[numbers.length - 1];
    } else if (this.isRoyalStraight_(numbers)) {
      rank.name = 'RoyalStraight';
      rank.point = RANK_POINTS.RoyalStraight;
    }
    if (!rank.name) {
      // check pairs
      const pairs = numbers.reduce((pair, n) => {
        pair[n] = pair[n] ? pair[n] + 1 : 1;
        return pair;
      }, {});
      let highest = 0;
      switch (Object.keys(pairs).length) {
        case 2:
          // 4-1 or 3-2
          for (let n in pairs) {
            if (pairs[n] === 4) {
              rank.name = 'FourCard';
              rank.point = RANK_POINTS.FourCard;
              highest = +n === 1 ? 14 : +n;
              break;
            } else if (pairs[n] === 3) {
              rank.name = 'FullHouse';
              rank.point = RANK_POINTS.FullHouse;
              highest = +n === 1 ? 14 : +n;
              break;
            }
          }
          break;
        case 3:
          // 3-1-1 or 2-2-1
          for (let n in pairs) {
            if (pairs[n] === 3) {
              rank.name = 'ThreeCard';
              rank.point = RANK_POINTS.ThreeCard;
              highest = +n === 1 ? 14 : +n;
              break;
            } else if (pairs[n] === 2) {
              rank.name = 'TwoPair';
              rank.point = RANK_POINTS.TwoPair;
              highest = highest && highest > +n ? highest : +n;
            }
          }
          break;
        case 4:
          // 2-1-1-1
          rank.name = 'OnePair';
          rank.point = RANK_POINTS.OnePair;
          for (let n in pairs) {
            if (pairs[n] === 2) {
              highest = +n;
              break;
            }
          }
          break;
        default:
          rank.name = 'HighCard';
          highest = numbers[0] === 1 ? 14 : numbers[numbers.length - 1];
      }
      rank.point += highest;
    }
    return rank;
  }

  isFlash_(cards) {
    return cards.every((e, i, self) => e.suit === self[0].suit);
  }

  isStraight_(numbers) {
    return numbers.every((e, i, self) => e + 1 === self[i + 1]);
  }

  isRoyalStraight_(numbers) {
    return numbers.toString() === [1, 10, 11, 12, 13].toString();
  }
}