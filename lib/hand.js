'use strict';

/**
 * Hand is a player's selection of cards.
 * @param {Number} [limit] Default: 5
 * @param {Card} [Card] Default: Card
 * @extends Array
 * @constructor
 */
function Hand(limit, Card) {
    this.limit = limit || 5;
    this.cardType = Card || require('./playingCard');
}

/**
 * To string, useful for mapping.
 * @param {Hand} hand
 * @returns {String} String representation of a hand.
 */
Hand.toString = function (hand) {
    return hand.map(hand.cardType.toString).join(',');
};

/**
 * To HTML string
 * @param {Hand} hand
 * @returns {String}
 */
Hand.toHtml = function (hand) {
    return '<div class="hand">'+hand.map(hand.cardType.toHtml).join(' ')+'</div>';
};

// Extend an array
Hand.prototype = [];

/**
 * Receive a card into this hand.
 * @param card {Card} the card that is being received
 * @return {Hand} For chainability we return 'this'
 */
Hand.prototype.addCard = function (card) {
    if (this.length < this.limit) {
        this.push(card);
    } else {
        throw 'Hand limit reached.';
    }

    return this;
};

/**
 * Returns the Hand's values as a sorted array from least to highest
 * @returns {Array}
 */
Hand.prototype.getSortedValues = function () {
    return this.map(this.cardType.toValue).sort(compareNumbers);
};

module.exports = Hand;

/**
 * Sorting routine.
 * @param a
 * @param b
 * @returns {number}
 * @private
 */
function compareNumbers(a, b) {
    return a - b;
}
