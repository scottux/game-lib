'use strict';

/**
 * Represents an individual playing card.
 * @constructor
 * @param {Number} suit The number associated with the suit (1 is Hearts, 2 is Clubs, 3 is Spades, 4 is Diamonds)
 * @param {Number} number The number of the card e.g. A is 1, K is 13
 */
function Card(suit, number) {
    const cardDefs = [
        {suit: 'Hearts', html: '&hearts;', symbol: '♥'},
        {suit: 'Clubs', html: '&clubs;', symbol: '♣'},
        {suit: 'Spades', html: '&spades;', symbol: '♠'},
        {suit: 'Diamonds', html: '&diams;', symbol: '♦'}
    ];

    /** @return {Number} The number of the card in the deck. (1-52) */
    this.getNumber = function () {
        return number;
    };

    /** @return {String} The name of the suit. "Hearts","Clubs","Spades", or "Diamonds." */
    this.getSuit = function () {
        return cardDefs[suit-1].suit;
    };

    /**
     * Get this card's symbol, pass true to get the html entity.
     * @param {Boolean} [escaped] HTML-encode the symbol?
     * @returns {String} The symbol, or HTML-encoded symbol, of the suit.
     */
    this.getSymbol = function (escaped) {
        return escaped ? cardDefs[suit-1].html : cardDefs[suit-1].symbol;
    };

    /** @return {Number} The value of the card for scoring. */
    this.getValue = function () {
        let value = number;

        if (value === 1) {
            value = 14;
        }

        return value;
    };

    /** @return {String} The name of the card. "Ace" */
    this.getName = function () {
        let cardName = '';

        switch (number) {
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
                cardName = number;
                break;
        }

        return cardName;
    };

    /** @return {String} The full name of the card. "Ace of Spades" */
    this.getFullName = function () {
        return this.getName() + this.getSymbol();
    };
}

Card.toValue = function (card) {
    return card.getValue();
};

Card.toString = function (card) {
    return card.getFullName();
};

Card.toHtml = function (card) {
    return '<span class="card">'+card.getName() + '<span class="card-'+card.getSuit().toLowerCase()+'">'+card.getSymbol(true)+'</span></span>';
};

Card.toSuit = function (card) {
    return card.getSuit();
};

module.exports = Card;
