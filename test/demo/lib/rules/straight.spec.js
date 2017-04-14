'use strict';

const Straight = require('../../../../demo/lib/rules/straight');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Straight', function () {
    it('should return highest value if straight', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,4));
        hand.addCard(new Card(4,3));
        hand.addCard(new Card(5,2));
        hand.addCard(new Card(6,1));
        assert.equal(Straight(hand).highestValue, 6);
    });

    it('should return false if not', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,4));
        hand.addCard(new Card(4,3));
        hand.addCard(new Card(5,2));
        hand.addCard(new Card(6,1));
        assert.equal(Straight(hand, 10), false);

        hand = new Hand(5, Card);

        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,4));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(5,2));
        hand.addCard(new Card(6,1));
        assert.equal(Straight(hand), false);
    });
});
