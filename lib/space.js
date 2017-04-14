'use strict';

/**
 * @param {Number} x The x location in the Board.
 * @param {Number} y The y location in the Board.
 * @constructor
 */
function Space(x, y) {
    if (!x || !y) {
        throw 'X and Y are required.';
    }

    /**
     * Players that might be in the space.
     * @type {Array}
     */
    this.occupants = [];

    /**
     * @type {Number}
     */
    this.x = x;

    /**
     * @type {Number}
     */
    this.y = y;
}

/**
 * Event to run when a player lands on this space.
 * @param {Player} player
 * @param {Space} player.currentSpace
 */
Space.prototype.onLanding = function(player) {
    player.currentSpace = this;
    this.occupants.push(player);
};

module.exports = Space;
