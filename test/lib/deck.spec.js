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

    it('should get a cards array', function () {
        assert.equal(deck.getCards().length, 52);
    });

    it('should shuffle the cards', function () {
        let firstCardBefore = deck.getCards()[0];
        let firstCardAfter;
        let fifthCardBefore = deck.getCards()[4];
        let fifthCardAfter;

        deck.shuffle();

        firstCardAfter = deck.getCards()[0];
        fifthCardAfter = deck.getCards()[4];

        // tiny chance that the shuffle will produce the card in the same spot, lessening that chance here.
        let isSame = fifthCardAfter.getFullName() === fifthCardBefore.getFullName() &&
            firstCardAfter.getFullName() === firstCardBefore.getFullName();

        assert.equal(isSame, false);
        assert.equal(deck.getCards().length, 52);
    });

    it('should hit you with a card', function () {
        assert.equal(deck.getCards().length, 52);
        let card = deck.hit();
        assert.instanceOf(card, Card);
        assert.equal(deck.getCards().length, 51);
    });
});
