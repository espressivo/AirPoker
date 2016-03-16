import Deck from "./deck.js"
import {Suits, Numbers} from "./card.js"

/**
 * Defines trump rule
 */
export default class Rule {
    constructor(setup_deck) {
        // setup_deck = {deckNum : 1, JockerNum : 0}
        this.deck = new Deck(setup_deck);
    }

    /**
     * finds cards to be able to put on the table from Player's hand and Table.
     * 
     * @param  obj hand
     * @param  obj table
     * @return str combination. If it is not found, the value is null.
     */
    findCandidate(hand, table) {
        throw new Error('Implement me');
    }

    rank() {
        throw new Error('Implement me');
    }

    action() {}
    judge() {}
    win() {}
    setOrder() {}
}
