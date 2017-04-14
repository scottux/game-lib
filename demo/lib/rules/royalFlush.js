'use strict';

let isStraight = require('../checks/isStraight');
let allAreEqual = require('../checks/allAreEqual');
let Card = require('../../../lib/playingCard');

module.exports = RoyalFlush;

/**
 * Rule for a royal flush, a special straight flush.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Straight_flush
 * @param {Hand} hand
 * @returns {Boolean}
 */
function RoyalFlush(hand) {
    const values = hand.getSortedValues();

    if (isStraight(values) && values[values.length - 1] === 14) { // Royal Straight
        const suits = hand.map(Card.toSuit);

        if (allAreEqual(suits)) { // Flush
            return true;
        }
    }

    return false;
}
