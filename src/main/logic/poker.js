import Rule from './trump_framework/rule.js';

export default class Pocker extends Rule {
    // deck num is 1
    constructor() {
        super(1);
    }

    //findCandidate(hand, table) {


    /*****************************
     * rank
     *   Retruns the following base rank.
     *      RoyalStraightFlush: 1,
     *      StraightFlush: 2,
     *      FourCard: 3,
     *      FullHouse: 4,
     *      Flush: 5,
     *      RoyalStraight: 6,
     *      Straight: 7,
     *      ThreeCard: 8,
     *      TwoPair: 9,
     *      OnePair: 10,
     *   And, adds one HighCard to the rank.
     *   Ace(1) is highest and Two(2) is lowest.
     *
     *   @param  obj hand = {number: int, suit: str}
     *   @return obj rank = {order: str, highest: int}
     *****************************/
    rank(hand) {
        let rank = this.isFlash(hand) ? {order: 'Flush'} : {};

        const numbers = hand.reduce((r, h) => {r.push(+h.number);return r;}, [])
                            .sort((a, b) => a - b);
        if (this.isStraight(numbers)) {
            rank.order = rank.order ? 'StraightFlush' : 'Straight';
        } else if (this.isRoyalStraight(numbers)) {
            rank.order = rank.order ? 'RoyalStraightFlush' : 'RoyalStraight';
        }
        if (rank.order) {
            // Gets highest number
            rank.highest = numbers[0] === 1 ? 1 : numbers[numbers.length - 1];
        } else {
            // check pairs
            const pairs = numbers.reduce( (pair, n) => {
                pair[n] = pair[n] ? pair[n] + 1: 1;
                return pair;
            }, {} );
            switch(Object.keys(pairs).length) {
                case 2:
                    // 4-1 or 3-2
                    for (let n in pairs) {
                        if (pairs[n] === 4) {
                            rank.order = 'FourCard';
                            rank.highest = +n;
                            break;
                        } else if (pairs[n] === 3) {
                            rank.order = 'FullHouse';
                            rank.highest = +n;
                            break;
                        }
                    }
                    break;
                case 3:
                    // 3-1-1 or 2-2-1
                    for (let n in pairs) {
                        if (pairs[n] === 3) {
                            rank.order = 'ThreeCard';
                            rank.highest = +n;
                            break;
                        } else if (pairs[n] === 2) {
                            rank.order = 'TwoPair';
                            rank.highest = rank.highest && rank.highest > +n ? rank.highest : +n;
                        }
                    }
                    break;
                case 4:
                    // 2-1-1-1
                    rank.order = 'OnePair';
                    for (let n in pairs) {
                        if (pairs[n] === 2) {
                            rank.highest = +n;
                            break;
                        }
                    }
                    break;
                default:
                    rank.order = 'HighCard';
                    rank.highest = numbers[0] === 1 ? 1 : numbers[numbers.length - 1];
            }
        }
        return rank;
    }

    // flush: hand内のsuitが全て同じ
    isFlash(hand) {
        return hand.every((e, i, self) => e.suit === self[0].suit);
    }

    isStraight(numbers) {
        return numbers.every((e, i, self) => e + 1 === self[i + 1]);
    }

    isRoyalStraight(numbers) {
        return numbers.toString() === [1,10,11,12,13].toString();
    }

    /*****************************
     * judgeInSameRank
     *   Retruns a highest number of the hand.
     *   If both of ranks are the same, compare a highest number of the hand.
     *   Ace(1) is highest. Two(2) is lowest.
     *   If they are the same, draw.
     *
     *   Suit and the Second Number are not considered.
     *****************************/
}