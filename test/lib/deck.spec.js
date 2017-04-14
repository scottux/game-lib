'use strict';

const Deck = require('../../lib/deck');
const Card = require('../../lib/card');
const assert = require('chai').assert;

describe('Deck', function () {
    let deck;

    it('should construct a deck properly', function () {
        deck = new Deck();
        assert.instanceOf(deck, Deck);
    });

    it('should be a cards array', function () {
        assert.isArray(Object.getPrototypeOf(deck));
    });

    it('should shuffle the cards', function () {
        let firstCardAfter;
        let fifthCardAfter;

        for (let i = 0; i < 52; i++) {
            deck.push(new Card(i));
        }
        let firstCardBefore = deck[0];
        let fifthCardBefore = deck[4];

        deck.shuffle();

        firstCardAfter = deck[0];
        fifthCardAfter = deck[4];

        // tiny chance that the shuffle will produce the card in the same spot, lessening that chance here.
        let isSame = fifthCardAfter.getFullName() === fifthCardBefore.getFullName() &&
            firstCardAfter.getFullName() === firstCardBefore.getFullName();

        assert.equal(isSame, false);
        assert.equal(deck.length, 52);
    });

    it('should hit you with a card', function () {
        deck = new Deck();
        deck.push(new Card(1));
        assert.equal(deck.length, 1);
        let card = deck.hit();
        assert.instanceOf(card, Card);
        assert.equal(deck.length, 0);
    });
});
