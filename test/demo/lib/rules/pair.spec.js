'use strict';

const Pair = require('../../../../demo/lib/rules/pair');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Pair', function () {
    let hand = new Hand(5, Card);

    hand.addCard(new Card(2,1));
    hand.addCard(new Card(2,2));
    hand.addCard(new Card(3,3));
    hand.addCard(new Card(4,1));
    hand.addCard(new Card(5,4));

    it('should return high value', function () {
        assert.equal(Pair(hand).highestValue, 2);
    });

    it('should return false if not highest', function () {
        assert.equal(Pair(hand, 3), false);
    });

    it('should return false if no pair', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(4,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(5,1));
        hand.addCard(new Card(7,4));
        assert.equal(Pair(hand), false);
    });
});
