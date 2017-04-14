'use strict';

/**
 * A Die is used to do things at random.
 *
 * @constructor
 * @param {Number} sides The number of sides on this Die.
 * @property {Number} sides The number of sides on this Die.
 */
function Die(sides) {
    /**
     * @type {Number}
     */
    this.sides = parseFloat(sides);
}

/**
 * @method roll Returns a random number between 1 and this.sides.
 * @returns {Number} Outcome of the roll.
 */
Die.prototype.roll = function () {
    return Math.floor((Math.random() * this.sides) + 1);
};

module.exports = Die;
