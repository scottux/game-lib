'use strict';

let isStraight = require('../checks/isStraight');

module.exports = Straight;

/**
 * Rule for a straight.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Straight
 * @param {Hand} hand
 * @param {Number} [highestValue]
 * @returns {{highestValue: *}|Boolean}
 */
function Straight(hand, highestValue) {
    const values = hand.getSortedValues(); // sorted values
    const highValue = values[values.length-1];
    highestValue = highestValue || 0;

    // @todo if the high value is 14 and the low value is 2, treat the 14 as 1.
    if (highValue > highestValue && isStraight(values)) {
        return {highestValue: highValue};
    } else {
        return false;
    }
}
