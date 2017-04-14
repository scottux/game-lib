'use strict';

const ThreeOfAKind = require('../../../../demo/lib/rules/threeOfAKind');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Three of a Kind', function () {
    let hand = new Hand(5, Card);

    hand.addCard(new Card(2,1));
    hand.addCard(new Card(2,2));
    hand.addCard(new Card(2,3));
    hand.addCard(new Card(4,1));
    hand.addCard(new Card(5,4));

    it('should return high value', function () {
        assert.equal(ThreeOfAKind(hand).highestValue, 2);
    });

    it('should return false if not highest', function () {
        assert.equal(ThreeOfAKind(hand, 3), false);
    });
});
