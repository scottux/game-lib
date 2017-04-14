'use strict';

let allAreEqual = require('../checks/allAreEqual');
let Card = require('../../../lib/playingCard');

module.exports = Flush;

/**
 * Rule for a flush.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Flush
 * @param {Hand} hand
 * @returns {Boolean}
 */
function Flush(hand) {
    const suits = hand.map(Card.toSuit);

    return allAreEqual(suits);
}
