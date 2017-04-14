'use strict';

const builder = require('../../../lib/deck/builder');
const builds = require('../../../lib/deck/builds');
const Deck = require('../../../lib/deck');
const Card = require('../../../lib/card');
const assert = require('chai').assert;

describe('Deck Builder', function () {
    it('should build a standard deck by default', function () {
        let deck = builder();
        assert.instanceOf(deck, Deck);
        assert.isArray(Object.getPrototypeOf(deck));
        assert.equal(deck.length, 52);
        assert.instanceOf(deck[0], Card);
    });

    it('should build a deck using a provided builder', function () {
        let deck = builder(Deck, Card, builds.jokers);
        assert.instanceOf(deck, Deck);
        assert.isArray(Object.getPrototypeOf(deck));
        assert.equal(deck.length, 54);
        assert.instanceOf(deck[0], Card);
    });

    it('should use a Card\'s child class', function () {
        let FooCard = function (number) {
            Card.call(this, number);
        };
        FooCard.prototype = Card.prototype;
        let deck = builder(Deck, FooCard, builds.jokers);
        assert.instanceOf(deck, Deck);
        assert.isArray(Object.getPrototypeOf(deck));
        assert.equal(deck.length, 54);
        assert.instanceOf(deck[0], Card);
        assert.instanceOf(deck[0], FooCard);
    });
});
