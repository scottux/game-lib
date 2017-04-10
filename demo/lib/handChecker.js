'use strict';

module.exports = handChecker;

/**
 * Checks each of the hands against a rule to determine the winner.
 * @param {Array} hands The hands to check
 * @param {Function} rule The rule to apply to determine winner.
 * @returns {Number|null} The index of the winning hand.
 */
function handChecker(hands, rule) {
    let winningHand = null;
    let highestValue = 0;

    hands.forEach(function (hand, handIndex) {
        const outcome = rule(hand, highestValue);

        if (outcome) {
            winningHand = handIndex;
            if (outcome.highestValue) {
                highestValue = outcome.highestValue;
            }
        }
    });

    return winningHand;
}
