'use strict';

let Card = require('./card');

module.exports = Deck;

/**
 * A set of 52 cards like a standard Playing Card Deck.
 * @constructor
 */
function Deck() {
    /* Creates a new set of cards. */
    let cards = [];

    /* Actually create those new cards. */
    buildDeck();

    /**
     * Shuffles the cards. Modifies the private instance of the cards array.
     * @return {Deck} For chainability we return 'this'
     */
    this.shuffle = function () {
        for (let j, x, i = cards.length; i; j = parseInt(Math.random() * i, 10), x = cards[--i], cards[i] = cards[j], cards[j] = x) {
            // Crazy shuffle routine.
        }

        return this;
    };

    /** @return {Card[]} An array of cards representing the Deck. */
    this.getCards = function () {
        return cards;
    };

    // /**
    //  * @param {Hand|Hole} target
    //  */
    // this.deal = function (target) {
    // };

    /** @return {Card} Pops the top card off the deck. */
    this.hit = function () {
        return cards.pop();
    };

    /*
     * Routine for making new cards, alternating suits and numbers.
     */
    function buildDeck() {
        for (let i = 0; i < 52; i++) {
            cards.push(new Card(i % 4 + 1, i % 13 + 1));
        }
    }
}
