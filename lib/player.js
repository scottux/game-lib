'use strict';

let Hand = require('./hand');

/**
 * @constructor
 * @param {String} name The Player's name.
 * @property {String} name The Player's name.
 * @property {Hand} hand The Players's Hand of Cards.
 */
function Player(name) {
    this.name = name;
    this.hand = new Hand();
}

Player.fromName = function(name) {
    return new Player(name);
};

Player.toHand = function (player) {
    return player.hand;
};

module.exports = Player;
