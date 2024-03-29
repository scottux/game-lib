'use strict';

const HighCard = require('../../../../demo/lib/rules/highCard');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: High Card', function () {
    it('should return high value', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(3,2));
        hand.addCard(new Card(4,3));
        hand.addCard(new Card(9,1));
        hand.addCard(new Card(4,4));
        assert.equal(HighCard(hand, 0).highestValue, 9);
    });

    it('should return false if not highest', function () {
        let hand = new Hand(5, Card);
        hand.addCard(new Card(2,1));
        hand.addCard(new Card(3,2));
        hand.addCard(new Card(4,3));
        hand.addCard(new Card(7,4));
        hand.addCard(new Card(9,1));
        assert.equal(HighCard(hand, 10), false);
    });
});
