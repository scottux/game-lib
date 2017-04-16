'use strict';

const Player = require('../../lib/player');
const Hand = require('../../lib/hand');
const PlayingCard = require('../../lib/playingCard');
const Deck  = require('../../lib/deck');
const deckBuilder = require('../../lib/deck/builder');
const euchreDeck = require('../../lib/deck/builds').euchre;

module.exports = Euchre;

/**
 *
 * @param {Array} playerNames
 * @constructor
 */
function Euchre(playerNames) {
    playerNames = playerNames || [];

    let players = playerNames.map(function (name) {
        return new Player(name, new Hand(5, PlayingCard));
    });

    // just setting for now
    let score = 0;
    setDealer(players)
    // need a better way to determine winner
    while (score < 10) {
        let deck = deckBuilder(Deck, PlayingCard, euchreDeck);
        deal(players, deck);
        let kitty = deck;
        changeDealer(players);
    }

    return ;
}

/**
 * Pass out cards to the Players, typically 5 for each.
 * @param {Player[]} players
 * @param {Deck} deck
 * @param {Number} [count] Default: 5
 * @private
 */
function deal(players, deck, count) {
    count = count || 5;

    for (let i = 0; i < count; i++) { // 5 cycles
        players.forEach(function (player) {
            player.hand.addCard(deck.hit()); // give players cards
        });
    }
}

function setDealer(players) {
    if (players.find(Player.isDealer) == undefined) {
        players[0].dealer = true;
    }
}

function changeDealer(players) {
    var index = players.findIndex(Player.isDealer);
    if (index != -1) {
        players[index].dealer = false;
        if (index == players.length -1) {
            players[0].dealer = true;
        } else {
            players[index+1].dealer = true;
        }
    }
}