'use strict';

/**
 * A shuffleable set of Cards.
 * @constructor
 * @extends Array
 */
function Deck() {}
// Extend an array
Deck.prototype = [];

/**
 * Shuffles the cards. Modifies the private instance of the cards array.
 * @return {Deck} For chainability we return 'this'
 */
Deck.prototype.shuffle = function () {
    for (let j, x, i = this.length; i; j = parseInt(Math.random() * i, 10), x = this[--i], this[i] = this[j], this[j] = x) {
        // Crazy shuffle routine.
    }

    return this;
};

/** @return {Card} Pops the top card off the deck. */
Deck.prototype.hit = function () {
    return this.pop();
};

module.exports = Deck;
