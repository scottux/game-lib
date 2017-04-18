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
    // remaining four cards after deal is referred to as a 'kitty'
    let kitty = deck[3];
    let firstPass = determineTrump(players, kitty);
    if (firstPass != -1) {
        // dealerPickUp()
        // setSuit(kitty)
        //dealer picks up card, and discards another and trump is the suit of kitty
    } else {
        // anotherDetermineTrumpFunction()
        // players have to call trump suit in clockwise order
        for (let player of players) {
            trump = findTrump(player);
            if (trump != -1) {
                trump = PlayingCard.getSuit(trump);
                break;
            }
        };
        console.log(trump);
    }

    // now that trump is defined, we play

    changeDealer(players);

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

function findTrump(player) {
    let suitArray = findSuitCount(player);
    return suitArray.findIndex(pickUp);

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
 * @param array hand
 */
function findSuitCount(playerHand) {
    let suits = [0,0,0,0];
    playerHand.hand.forEach(function (card) {
        suits[card.suit -1]++;
    });

    return suits;
}