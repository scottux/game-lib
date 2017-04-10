'use strict';

let isStraight = require('../checks/isStraight');
let allAreEqual = require('../checks/allAreEqual');
let Card = require('../../../lib/card');

module.exports = StraightFlush;

/**
 * Rule for a straight flush.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Straight_flush
 * @param {Hand} hand
 * @param {Number} [highestValue]
 * @returns {{highestValue: Number}|Boolean}
 */
function StraightFlush(hand, highestValue) {
    const values = hand.getSortedValues();
    const highValue = values[values.length-1];
    highestValue = highestValue || 0;

    if (highValue > highestValue && isStraight(values)) {
        const suits = hand.getCards().map(Card.toSuit);

        if (allAreEqual(suits)) { // Flush
            return {highestValue: highValue};
        }
    }
    return false;
}
