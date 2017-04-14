'use strict';

let Hand = require('./hand');

/**
 * @constructor
 * @param {String} name The Player's name.
 * @param {Hand} [hand] The Players's Hand of Cards.
 * @property {String} name The Player's name.
 * @property {Hand} hand The Players's Hand of Cards.
 */
function Player(name, hand) {
    this.name = name;
    this.hand = hand || new Hand();
}

/**
 * Create a Player from a name.
 * @param {String} name The name for the new Player.
 * @returns {Player}
 */
Player.fromName = function(name) {
    return new Player(name);
};

/**
 * Map a player to their Hand.
 * @param {Player} player
 * @returns {Hand}
 */
Player.toHand = function (player) {
    return player.hand;
};

module.exports = Player;
