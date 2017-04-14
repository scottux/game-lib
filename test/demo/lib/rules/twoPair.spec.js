'use strict';

const TwoPair = require('../../../../demo/lib/rules/twoPair');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Two Pair', function () {
    it('should return true if there are two pair', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(3,1));
        hand.addCard(new Card(5,4));
        assert.equal(TwoPair(hand), true);
    });

    it('should return false if not', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(4,1));
        hand.addCard(new Card(5,4));
        assert.equal(TwoPair(hand), false);
    });
});
