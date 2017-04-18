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
    let trump;
    let players = playerNames.map(function (name) {
        return new Player(name, new Hand(5, PlayingCard));
    });
    let deck = deckBuilder(Deck, PlayingCard, euchreDeck);
    setInitialDealer(players);
    deal(players, deck);
    // remaining four cards after deal is referred to as a 'kitty', but in this
    // instance we are saying the kitty is the top card of that pile
    let kitty = deck[3];
    let firstPass = determineTrump(players, kitty);

    if (firstPass != -1) {
        trump = setTrump(kitty);
        //dealer picks up card, and discards another and trump is the suit of kitty
    } else {
        // players have to call trump suit in clockwise order
        trump = callTrump(players);
    }
    // now that trump is defined, we play the game

    changeDealer(players);

    return ;
}

/**
 * @param players
 * @returns {number}
 */
function callTrump(players) {
    let trump = -1;
    for (let player of players) {
        let trumpFound = findTrump(player, pickUp);
        if (trumpFound != -1) {
            trump = PlayingCard.getSuitValue(trumpFound);
            break;
        }
    };
    if (trump == -1) {
        trump = PlayingCard.getSuitValue(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
    }

    return trump;
}

/**
 * @param card
 */
function setTrump(card) {
    return PlayingCard.getSuitValue(card.suit -1);
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
 * @param players
 */
function setInitialDealer(players) {
    if (players.find(Player.isDealer) == undefined) {
        Player.setDealer(players[0]);
    }
}

/**
 * @param players
 */
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

/**
 * Will return the index of the player that wants to call trump, otherwise
 * will send -1, which signifies we will need to loop over players again
 * to see if any player wants to call trump
 *
 * @param players
 * @param card
 * @returns {number}
 */
function determineTrump(players, card) {
    let matchCount = [];
    players.forEach(function (player) {
        let count = 0;
        player.hand.forEach(function (playerCard) {
            if (card.suit === playerCard.suit) {
                count++;
            }
        });
        matchCount.push(count);
    });
    return matchCount.findIndex(pickUp);
}

/**
 * -1 If not found, otherwise index in array that passes pickUp
 * @param player
 * @returns {number}
 */
function findTrump(player, callable) {
    let suitArray = findSuitCount(player);
    return suitArray.findIndex(callable);

}

/**
 * @param count
 * @returns {boolean}
 */
function pickUp(suitCount) {
    return suitCount > 2;
}

/**
 * returns an array where key is the suit and number is the quantity
 * (0 is Hearts, 1 is Clubs, 2 is Spades, 3 is Diamonds)
 * @param {Array} hand
 * @return {Array} suits
 */
function findSuitCount(playerHand) {
    let suits = [0,0,0,0];
    playerHand.hand.forEach(function (card) {
        suits[card.suit -1]++;
    });

    return suits;
}