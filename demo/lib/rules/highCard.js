'use strict';

module.exports = HighCard;

/**
 * Rule for high card.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#High_card
 * @param {Hand} hand
 * @param {Number} [highestValue]
 * @returns {{highestValue: *}|Boolean}
 */
function HighCard(hand, highestValue) {
    let values = hand.getSortedValues();
    let highValue = values[values.length - 1];
    highestValue = highestValue || 0;

    if (highValue > highestValue) {
        return {highestValue: highValue};
    } else {
        return false;
    }
}
