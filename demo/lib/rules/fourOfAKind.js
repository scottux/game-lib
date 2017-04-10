'use strict';

module.exports = FourOfAKind;

/**
 * Rule for four of a kind.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Four_of_a_kind
 * @param {Hand} hand
 * @param {Number} [highestValue]
 * @returns {{highestValue: *}|Boolean}
 */
function FourOfAKind(hand, highestValue) {
    const values = hand.getSortedValues();
    highestValue = highestValue || 0;

    for (let i = values.length - 1; i > 0; i--) { // start from the high side
        let currentVal = values[i];

        if (currentVal > highestValue &&
            currentVal === values[i - 1] &&
            currentVal === values[i - 2] &&
            currentVal === values[i - 3]) { // sorted, so do the neighbors match?

            return {highestValue: currentVal};
        }
    }

    return false;
}
