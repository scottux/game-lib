'use strict';

module.exports = Pair;

/**
 * Rule for a pair.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#One_pair
 * @param {Hand} hand
 * @param {Number} [highestValue]
 * @returns {{highestValue: *}|Boolean}
 */
function Pair(hand, highestValue) {
    let values = hand.getSortedValues(); // sorted values
    highestValue = highestValue || 0;

    for (let i = values.length - 1; i > 0; i--) { // start from the high side
        const currentVal = values[i];

        if (currentVal > highestValue && currentVal === values[i - 1]) { // sorted, so does the neighbor match?
            return {highestValue: currentVal};
        }
    }
    return false;
}
