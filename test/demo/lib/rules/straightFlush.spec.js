'use strict';

const StraightFlush = require('../../../../demo/lib/rules/straightFlush');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Straight Flush', function () {
    it('should return highest value if straight and flush', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(1,4));
        hand.addCard(new Card(1,5));
        hand.addCard(new Card(1,6));
        assert.equal(StraightFlush(hand).highestValue, 6);
    });

    it('should return false if not', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(1,4));
        hand.addCard(new Card(1,5));
        hand.addCard(new Card(1,6));
        assert.equal(StraightFlush(hand, 10), false);

        hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(1,4));
        hand.addCard(new Card(2,5));
        hand.addCard(new Card(1,6));
        assert.equal(StraightFlush(hand, 0), false);
    });
});
