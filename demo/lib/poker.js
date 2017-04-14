'use strict';

const Player = require('../../lib/player');
const Hand = require('../../lib/hand');
const PlayingCard = require('../../lib/playingCard');
const Deck = require('../../lib/deck');
const deckBuilder = require('../../lib/deck/builder');
const standardDeck = require('../../lib/deck/builds').standard;
// This is a routine that checks all the hands against a given rule.
const handChecker = require('./handChecker');

module.exports = Poker;

/**
 * Defines a game of Poker.
 * @param {Array} [playerNames] Names of all the players.
 * @param {String} outputMethod One of 'html' or 'string' to determine rendering method.
 */
function Poker(playerNames, outputMethod) {
    playerNames = playerNames || [];
    outputMethod = outputMethod || 'string';
    let players = playerNames.map(function (name) {
        return new Player(name, new Hand(5, PlayingCard));
    });
    let deck = deckBuilder(Deck, PlayingCard, standardDeck);

    deal(players, deck);

    return declareWinner(players, outputMethod);
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

/**
 * Uses defined rules and declares the winner based on each Player's Hand
 * @param {Player[]} players
 * @param {String} outputMethod 'html' or 'string'
 * @returns {String} The outcome in the preferred format, html or plain string
 * @private
 */
function declareWinner(players, outputMethod) {
    const hands = players.map(Player.toHand);
    // order is important here
    const rules = [
        require('./rules/royalFlush'),
        require('./rules/straightFlush'),
        require('./rules/fourOfAKind'),
        require('./rules/fullHouse'),
        require('./rules/flush'),
        require('./rules/straight'),
        require('./rules/threeOfAKind'),
        require('./rules/twoPair'),
        require('./rules/pair'),
        require('./rules/highCard')
    ];

    for (let rule of rules) { // for each rule, in order, check the hands for a winner.
        let result = handChecker(hands, rule);

        if (result !== null) { // we have a winner
            return output(rule, result);
        }
    }

    // for logging
    function output(rule, result) {
        let string = players[result].name + ' won! With a '+rule.name+'.';

        if (outputMethod === 'html') {
            string = '<p>'+string+'</p><div class="hands">'+hands.map(Hand.toHtml).join('')+'</div>';
        } else {
            string = string+' Results: '+hands.map(Hand.toString).join(' - ');
        }

        return string;
    }
}
