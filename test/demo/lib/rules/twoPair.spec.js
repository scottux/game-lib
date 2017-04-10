'use strict';

const TwoPair = require('../../../../demo/lib/rules/twoPair');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Two Pair', function () {
    it('should return true if there are two pair', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(4,5));
        assert.equal(TwoPair(hand), true);
    });

    it('should return false if not', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(1,4));
        hand.addCard(new Card(4,5));
        assert.equal(TwoPair(hand), false);
    });
});
