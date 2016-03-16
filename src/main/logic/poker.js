import Rule from './trump_framework/rule.js';

export default class Pocker extends Rule {
    // deck num is 1
    constructor() {
        super(1);
    }
    // hand is sorted
    findCandidate(hand, table) {
        hand.sort(function(a, b){
            return (a.number > b.number) ? 1 : -1;
        });
        var rankFlag = {};
        /*
            royal: false,
            straight: false,
            flush: false,
            four: false,
            three: false,
            pair: 0,
            highNum: null,
            highSuit: null
        for(var i = 1; i < 5; ++i){
            if(hand[0].suit != hand[i].suit){
                rankFlag.flush = false;
                break;
            }
        }*/
        // flush: hand内のsuitが全て同じ
        rankFlag.flush = hand.every( (e, i, self) => {
            return (e.suit === self[0].suit);
        });

        for(var i = 0; i < 4; ++i){
            for(var j = i+1; j < 5; ++j){
                if(hand[i].number == hand[j].number)
                    ++pair;
            }
        }
        var straight = 1;
        for(var i = 1; i < 5; ++i){
            if(cards[i-1].number + 1 != cards[i].number){
                straight = 0;
                break;
            }
        }
        if(cards[0].number == 1 && cards[1].number == 10 && cards[2].number == 11 && cards[3].number == 12 && cards[4].number == 13){
            rankFlag.royal = 1;
        }
        return (flush * 100 + straight * 10 + pair);
    }
    rank() {
        this.ranks = {
            RoyalStraightFlush: 1,
            StraightFlush: 2,
            FourCard: 3,
            FullHouse: 4,
            Flush: 5,
            Straight: 6,
            ThreeCard: 7,
            TwoPair: 8,
            Pair: 9,
            HighCard: 10
        }
    }

}