'use strict';

const Player = require('../../lib/player');
const Hand = require('../../lib/hand');
const PlayingCard = require('../../lib/playingCard');
const Deck  = require('../../lib/deck');
const deckBuilder = require('../../lib/deck/builder');
const euchreDeck = require('../../lib/deck/builds').euchre;

module.exports = Euchre;

const scoreCard = {'ToonSquad': 0, 'Monstars': 0};

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
    setInitialDealer(players);
    let deck = deckBuilder(Deck, PlayingCard, euchreDeck);
    deal(players, deck);
    let kitty = deck[3];
    let trump = determineTrump(players, kitty);
    let winnerDeclared = false;
    while (!winnerDeclared) {
        playRound(players, trump);
        winnerDeclared = checkScoreCard();
        let deck = deckBuilder(Deck, PlayingCard, euchreDeck);
        deal(players, deck);
    }
    let winners = scoreCard.ToonSquad > 9 ? 'ToonSquad' : 'Monstars';
    console.log(winners + ' won the game!');

    return;
}

function checkScoreCard() {
    return scoreCard.ToonSquad > 9 || scoreCard.Monstars > 9;
}

function playRound(players, trump) {
    let playPile = [];
    while (handsEmpty(players)) {
        for (let i = 0; i < players.length; i++) {
            playPile.push(playCard(players[i], trump));
        }
        score(playPile, trump);
        changeDealer(players);
        playPile = [];
    }
}


/**
 *
 * @param {Array} players
 * @param card
 * @returns {object}
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

    return (matchCount.findIndex(pickUp) != -1) ? setTrump(card) : callTrump(players);
}

/**
 * @param card
 */
function setTrump(card) {
    return PlayingCard.getSuitValue(card.suit -1);
}

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

function handsEmpty(players) {
    return players[0].hand.length;
}

function score(cards) {
    let team1Highest = compareCards([cards[0], cards[2]]);
    let team2Highest = compareCards([cards[1], cards[3]]);
    if (team1Highest.number > team2Highest.number) {
        scoreCard.ToonSquad++;
    } else {
        scoreCard.Monstars++;
    }
}

function compareCards(team) {
    return team[0].number > team[1].number ? team[0] : team[1];
}

function playCard(player, trump) {
    let trumpCards = hasTrumpCards(player, trump);
    return trumpCards.length ? arrangeAndGetTopCard(trumpCards, true, player) : arrangeAndGetTopCard(player.hand, false);
}

function hasTrumpCards(player, trump) {
    let cards = [];
    for (let i = 0; i < player.hand.length; i++) {
        if (player.hand[i].getSuit() === trump.suit) {
            cards.push(player.hand.splice(i, 1).pop());
        }
    }

    return cards;
}

function arrangeAndGetTopCard(cards, hasTrump, player) {
    cards.sort((a, b) =>  a.number - b.number);
    let card = cards.pop();
    if (hasTrump) {
        cards.forEach(function(card) {
            player.hand.addCard(card);
        });
    }
    return card;
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
