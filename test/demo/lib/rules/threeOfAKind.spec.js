'use strict';

const ThreeOfAKind = require('../../../../demo/lib/rules/threeOfAKind');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Three of a Kind', function () {
    let hand = new Hand();

    hand.addCard(new Card(1,2));
    hand.addCard(new Card(2,2));
    hand.addCard(new Card(3,2));
    hand.addCard(new Card(1,4));
    hand.addCard(new Card(4,5));

    it('should return high value', function () {
        assert.equal(ThreeOfAKind(hand).highestValue, 2);
    });

    it('should return false if not highest', function () {
        assert.equal(ThreeOfAKind(hand, 3), false);
    });
});
