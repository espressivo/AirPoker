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
     *      StraightFlush: 1,
     *      FourCard: 2,
     *      FullHouse: 3,
     *      Flush: 4,
     *      Straight: 5,
     *      ThreeCard: 6,
     *      TwoPair: 7,
     *      Pair: 8,
     *   And, adds one HighCard to the rank.
     *   Ace(1) is highest and Two(2) is lowest.
     *
     *   @param  obj hand = {number: int, suit: str}
     *   @return obj rank = {order: str, highest: int}
     *****************************/
    rank(hand) {
        let rank = isFlash(hand) ? {order: 'Flush'} : {};

        const numbers = hand.reduce((r, h) => {r.push(+h.number);return r;}, [])
                            .sort((a, b) => a - b);
        if (isStraight(numbers)) {
            rank.order = rank.order ? 'StraightFlush' : 'Straight';
        }
        if (!rank) {
            const pairs = numbers.reduce( (pair, n) => {
                pair[n] = pair[n] ? pair[n] + 1: 1;
                return pair;
            }, {} );
            pairs
        }
        return rank;
    }

    // flush: hand内のsuitが全て同じ
    isFlash(hand) {
        return hand.every((e, i, self) => e.suit === self[0].suit);
    }

    isStraight(numbers) {
        return numbers.every((e, i, self) => e + 1 === self[i + 1])
            || numbers.toString() == [1,10,11,12,13].toString() ;
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