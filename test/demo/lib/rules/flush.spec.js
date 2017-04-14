'use strict';

const Flush = require('../../../../demo/lib/rules/flush');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Flush', function () {
    it('should return true if all suits in the hand are equal', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(3,1));
        hand.addCard(new Card(5,1));
        hand.addCard(new Card(7,1));
        hand.addCard(new Card(9,1));
        assert.equal(Flush(hand), true);
    });

    it('should return false if not equal', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(3,2));
        hand.addCard(new Card(5,3));
        hand.addCard(new Card(7,4));
        hand.addCard(new Card(9,1));
        assert.equal(Flush(hand), false);
    });
});
