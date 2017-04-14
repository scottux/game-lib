'use strict';

const Card = require('../../lib/card');
const assert = require('chai').assert;

describe('Card', function() {
    let card;

    it('should construct a card properly', function () {
        card = new Card(1);
        assert.instanceOf(card, Card);
    });
    it('should get the value', function () {
        assert.equal(card.getValue(), 1);
        assert.equal(Card.toValue(card), 1);
    });
    it('should get the number', function () {
        assert.equal(card.getNumber(), 1);
    });
    it('should get the name', function () {
        assert.equal(card.getName(), '#1');
    });
    it('should get the full name', function () {
        assert.equal(card.getFullName(), 'Card #1');
        assert.equal(Card.toString(card), 'Card #1');
    });
    it('should render html', function () {
        assert.equal(Card.toHtml(card), '<span class="card">#1</span>');
    });
});