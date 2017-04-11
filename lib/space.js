'use strict';

module.exports = Space;

/**
 * @param {Number} x The x location in the Board.
 * @param {Number} y The y location in the Board.
 * @constructor
 */
function Space(x, y) {
    let occupants = [];

    /**
     * @type Number
     */
    this.x = x;

    /**
     * @type Number
     */
    this.y = y;

    /**
     * Event to run when a player lands on this space.
     * @param {Player} player
     */
    this.onLanding = function(player) {
        player.currentSpace = this;
        occupants.push(player);
    };

    /**
     *
     * @returns {Array}
     */
    this.getOccupied = function () {
        return occupants;
    };
}
