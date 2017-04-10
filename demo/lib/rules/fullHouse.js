'use strict';

let tripleDouble = require('../checks/tripleDouble');

module.exports =FullHouse;

/**
 * Rule for a full house.
 * https://en.wikipedia.org/wiki/List_of_poker_hands#Full_house
 * @param {Hand} hand
 * @returns {Boolean}
 */
function FullHouse(hand) {
    const values = hand.getSortedValues();

    // ... Check for triple then double, then flip the array and do it again.
    return (tripleDouble(values) || tripleDouble(Array.from(values).reverse()));
}
