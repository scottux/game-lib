'use strict';

module.exports = ThreeOfAKind;

/**
 * Rule for three of a kind.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Three_of_a_kind
 * @param {Hand} hand
 * @param {Number} [highestValue]
 * @returns {{highestValue: *}|Boolean}
 */
function ThreeOfAKind(hand, highestValue) {
    const values = hand.getSortedValues(); // sorted values
    highestValue = highestValue || 0;

    for (let i = values.length - 1; i > 0; i--) { // start from the high side
        const currentVal = values[i];

        if (currentVal > highestValue && currentVal === values[i - 1] && currentVal === values[i - 2]) { // sorted, so do the neighbors match?
            return {highestValue: currentVal};
        }
    }
    return false;
}
