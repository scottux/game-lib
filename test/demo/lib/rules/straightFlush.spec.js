'use strict';

const StraightFlush = require('../../../../demo/lib/rules/straightFlush');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Straight Flush', function () {
    it('should return highest value if straight and flush', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(3,1));
        hand.addCard(new Card(4,1));
        hand.addCard(new Card(5,1));
        hand.addCard(new Card(6,1));
        assert.equal(StraightFlush(hand).highestValue, 6);
    });

    it('should return false if not', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(3,1));
        hand.addCard(new Card(4,1));
        hand.addCard(new Card(5,1));
        hand.addCard(new Card(6,1));
        assert.equal(StraightFlush(hand, 10), false);

        hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(3,1));
        hand.addCard(new Card(4,1));
        hand.addCard(new Card(5,2));
        hand.addCard(new Card(6,1));
        assert.equal(StraightFlush(hand, 0), false);
    });
});
