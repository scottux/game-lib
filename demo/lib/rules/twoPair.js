'use strict';

module.exports = TwoPair;

/**
 * Rule for two pair.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Two_pair
 * @param {Hand} hand
 * @returns {Boolean}
 */
function TwoPair(hand) {
    let values = hand.getSortedValues(); // sorted values
    let pairCount = 0;

    for (let i = values.length - 1; i > 0; i--) { // start from the high side
        if (values[i] === values[i - 1]) { // sorted, so does the neighbor match?
            pairCount++;
            --i; // skip the next card
        }
    }

    return (pairCount === 2);
}
