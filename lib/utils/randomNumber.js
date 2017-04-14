'use strict';

module.exports = randomNumber;

/**
 * Utility function to generate a random number in a range.
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} A random number between min and max.
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
