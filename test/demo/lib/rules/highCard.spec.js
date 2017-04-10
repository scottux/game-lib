'use strict';

const HighCard = require('../../../../demo/lib/rules/HighCard');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: High Card', function () {
    it('should return high value', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,2));
        hand.addCard(new Card(2,3));
        hand.addCard(new Card(3,4));
        hand.addCard(new Card(1,9));
        hand.addCard(new Card(4,4));
        assert.equal(HighCard(hand, 0).highestValue, 9);
    });

    it('should return false if not highest', function () {
        let hand = new Hand();
        hand.addCard(new Card(1,2));
        hand.addCard(new Card(2,3));
        hand.addCard(new Card(3,4));
        hand.addCard(new Card(4,7));
        hand.addCard(new Card(1,9));
        assert.equal(HighCard(hand, 10), false);
    });
});
