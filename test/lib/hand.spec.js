'use strict';

const Hand = require('../../lib/hand');
const Card = require('../../lib/playingCard');
const assert = require('chai').assert;

describe('Hand', function() {
    let hand;

    it('should construct a hand properly', function () {
        hand = new Hand(5, Card);
        assert.instanceOf(hand, Hand);
    });

    it('should add and get a card', function () {
        assert.equal(hand.length, 0);
        hand.addCard(new Card(1,1));
        assert.equal(hand.length, 1);
    });

    it('should return an array of sorted values', function () {
        let values = hand.getSortedValues();
        assert.equal(values.length, 1);
        assert.equal(values[0], 14);
    });

    it('should have an output method', function () {
        assert.equal(Hand.toString(hand), 'A♥');
    });

    it('should render html', function () {
        let html = '<div class="hand"><span class="card">A<span class="card-hearts">&hearts;</span></span></div>';

        assert.equal(Hand.toHtml(hand), html);
    });
});
