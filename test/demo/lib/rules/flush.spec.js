'use strict';

const Flush = require('../../../../demo/lib/rules/flush');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Flush', function () {
    it('should return true if all suits in the hand are equal', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(1,5));
        hand.addCard(new Card(1,7));
        hand.addCard(new Card(1,9));
        assert.equal(Flush(hand), true);
    });

    it('should return false if not equal', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(2,3));
        hand.addCard(new Card(3,5));
        hand.addCard(new Card(4,7));
        hand.addCard(new Card(1,9));
        assert.equal(Flush(hand), false);
    });
});
