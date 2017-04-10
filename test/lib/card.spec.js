'use strict';

const Card = require('../../lib/card');
const assert = require('chai').assert;

describe('Card', function() {
    let card;

    it('should construct a card properly', function () {
        card = new Card(1, 1); // Ace of Hearts
        assert.instanceOf(card, Card);
    });
    it('should get the symbol', function () {
        card = new Card(1, 1); // Ace of Hearts
        assert.equal(card.getSuit(), 'Hearts');
        assert.equal(card.getSymbol(), '♥');
    });
    it('should get the value', function () {
        assert.equal(card.getValue(), 14);
        assert.equal(Card.toValue(card), 14);
    });
    it('should get the number', function () {
        assert.equal(card.getNumber(), 1);
    });
    it('should get the suit', function () {
        assert.equal(card.getSuit(), 'Hearts');
        assert.equal(Card.toSuit(card), 'Hearts');
    });
    it('should get the name', function () {
        assert.equal(card.getName(), 'A');
    });
    it('should get the full name', function () {
        assert.equal(card.getFullName(), 'A♥');
        assert.equal(Card.toString(card), 'A♥');
    });
});