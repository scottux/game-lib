'use strict';

let Card = require('./card');

/**
 * Hand is a player's selection of cards.
 * @param {Number} [limit] Default: 5
 * @constructor
 */
function Hand(limit) {
    let cards = [];
    limit = limit || 5;

    /**
     * Receive a card into this hand.
     * @param card {Card} the card that is being received
     * @return {Hand} For chainability we return 'this'
     */
    this.addCard = function (card) {
        if (cards.length < limit) {
            cards.push(card);
        } else {
            throw 'Hand limit reached.';
        }

        return this;
    };

    /**
     * Return the Cards for this Hand
     * @returns {Card[]}
     */
    this.getCards = function () {
        return cards;
    };

    /**
     * Returns the Hand's values as a sorted array from least to highest
     * @returns {Array}
     */
    this.getSortedValues = function () {
        return cards.map(Card.toValue).sort(compareNumbers);
    };
}

Hand.toString = function(hand) {
    return hand.getCards().map(Card.toString).join(',');
};

module.exports = Hand;

function compareNumbers(a, b) {
    return a - b;
}


