'use strict';

const Card = require('./card');

const cardDefs = [
    {suit: 'Hearts', html: '&hearts;', symbol: '♥'},
    {suit: 'Clubs', html: '&clubs;', symbol: '♣'},
    {suit: 'Spades', html: '&spades;', symbol: '♠'},
    {suit: 'Diamonds', html: '&diams;', symbol: '♦'}
];

/**
 * Represents an individual playing card.
 * @constructor
 * @param {Number} number The number of the card e.g. A is 1, K is 13
 * @param {Number} suit The number associated with the suit (1 is Hearts, 2 is Clubs, 3 is Spades, 4 is Diamonds)
 */
function PlayingCard(number, suit) {
    Card.call(this, number);
    this.suit = suit;
}
PlayingCard.prototype = Object.create(Card.prototype);
//PlayingCard.prototype.constructor = PlayingCard;

/** @return {String} The name of the suit. "Hearts","Clubs","Spades", or "Diamonds." */
PlayingCard.prototype.getSuit = function () {
    let definition = typeof this.suit !== 'undefined' ? cardDefs[this.suit-1] : null;

    return definition ? definition.suit : '';
};

/**
 * Get this card's symbol, pass true to get the html entity.
 * @param {Boolean} [escaped] HTML-encode the symbol?
 * @returns {String} The symbol, or HTML-encoded symbol, of the suit.
 */
PlayingCard.prototype.getSymbol = function (escaped) {
    let definition = typeof this.suit !== 'undefined' ? cardDefs[this.suit-1] : null;

    if (definition) {
        return escaped ? definition.html : definition.symbol;
    } else {
        return '';
    }
};

/** @return {Number} The value of the card for scoring. */
PlayingCard.prototype.getValue = function () {
    let value = this.number;

    if (value === 1) {
        value = 14;
    }

    return value;
};

/** @return {String} The name of the card. "Ace" */
PlayingCard.prototype.getName = function () {
    let cardName = '';

    switch (this.number) {
        case 1:
            cardName = "A";
            break;
        case 13:
            cardName = "K";
            break;
        case 12:
            cardName = "Q";
            break;
        case 11:
            cardName = "J";
            break;
        default:
            cardName = this.number;
            break;
    }

    return cardName;
};

/** @return {String} The full name of the card. "Ace of Spades" */
PlayingCard.prototype.getFullName = function () {
    return this.getName() + this.getSymbol();
};

PlayingCard.toHtml = function (card) {
    return '<span class="card">'+card.getName() + '<span class="card-'+card.getSuit().toLowerCase()+'">'+card.getSymbol(true)+'</span></span>';
};

PlayingCard.toSuit = function (card) {
    return card.getSuit();
};

PlayingCard.toValue = Card.toValue;
PlayingCard.toString = Card.toString;

module.exports = PlayingCard;
