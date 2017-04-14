'use strict';

/**
 * Represents a numbered card.
 * @constructor
 * @param {Number} number The number of the card.
 */
function Card(number) {
    this.number = number;
}

/** @return {Number} The card's main purpose is to be a numbered entity. */
Card.prototype.getNumber = function () {
    return this.number;
};

/** @return {Number} The value of the card for scoring. */
Card.prototype.getValue = function () {
    return this.number;
};

/** @return {String} The name of the card. */
Card.prototype.getName = function () {
    return '#'+this.number;
};

/** @return {String} The full name of the card. */
Card.prototype.getFullName = function () {
    return 'Card '+this.getName();
};

/**
 * Static method useful for mappings.
 * @param {Card} card
 * @returns {Number} The value of the card.
 */
Card.toValue = function (card) {
    return card.getValue();
};

/**
 * Static method useful for mappings.
 * @param {Card} card
 * @returns {String} The full name of the card.
 */
Card.toString = function (card) {
    return card.getFullName();
};

/**
 * Static method useful for mappings.
 * @param {Card} card
 * @returns {string} HTML string representing the card.
 */
Card.toHtml = function (card) {
    return '<span class="card">'+card.getName() + '</span>';
};

module.exports = Card;
