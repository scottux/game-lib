'use strict';

let Player = require('../../lib/player');
let Hand = require('../../lib/hand');
let Deck = require('../../lib/deck');
// This is a routine that checks all the hands against a given rule.
let handChecker = require('./handChecker');

module.exports = Poker;

/**
 * Defines a game of Poker.
 * @param {Array} [playerNames] Names of all the players.
 */
function Poker(playerNames, outputMethod) {
    playerNames = playerNames || [];
    outputMethod = outputMethod || 'string';
    let players = playerNames.map(Player.fromName);
    let deck = new Deck();

    deck.shuffle();
    deal();

    return declareWinner();

    // Pass out cards to the Players, 5 for each.
    function deal() {
        for (let i = 0; i < 5; i++) { // 5 cycles
            players.forEach(function (player) {
                player.hand.addCard(deck.hit()); // give players cards
            });
        }
    }

    // Uses defined rules and declares the winner based on each Player's Hand
    function declareWinner() {
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
}
