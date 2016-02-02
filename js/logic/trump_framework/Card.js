'use strict';

export const Suits = {
    HEART: Symbol('heart'),
    DIAMOND: Symbol('diamond'),
    SPADE: Symbol('spade'),
    CLUB: Symbol('club')
};
//this.suitNum = Object.keys(Suits).length;

export const Numbers = {
    1: Symbol('ace'),
    2: Symbol('two'),
    3: Symbol('three'),
    4: Symbol('four'),
    5: Symbol('five'),
    6: Symbol('six'),
    7: Symbol('seven'),
    8: Symbol('eight'),
    9: Symbol('nine'),
    10: Symbol('ten'),
    11: Symbol('Jack'),
    12: Symbol('queen'),
    13: Symbol('king')
};

export class Card {
    /**
     * Creates new card instance by suit and number.
     * Suit is at either one of SPADE,DIAMOND,CLUB or HEART.
     * 
     * @param str trump suit
     * @param str trump number
     */
    constructor(suit, number) {
        this.suit = Suits[suit];
        this.number = Numbers[number];
        if (!this.suit || !this.number) {
            throw 'ERROR: invalid Card value.';
        }
    }
}
