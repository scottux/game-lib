'use strict';

const Pair = require('../../../../demo/lib/rules/pair');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Pair', function () {
    let hand = new Hand();

    hand.addCard(new Card(1,2));
    hand.addCard(new Card(2,2));
    hand.addCard(new Card(3,3));
    hand.addCard(new Card(1,4));
    hand.addCard(new Card(4,5));

    it('should return high value', function () {
        assert.equal(Pair(hand).highestValue, 2);
    });

    it('should return false if not highest', function () {
        assert.equal(Pair(hand, 3), false);
    });

    it('should return false if no pair', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(2,4));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(1,5));
        hand.addCard(new Card(4,7));
        assert.equal(Pair(hand), false);
    });
});
