'use strict';

const RoyalFlush = require('../../../../demo/lib/rules/royalFlush');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Royal Flush', function () {
    it('should return true if royal flush', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,10));
        hand.addCard(new Card(1,11));
        hand.addCard(new Card(1,12));
        hand.addCard(new Card(1,13));
        assert.equal(RoyalFlush(hand), true);
    });

    it('should return false if not', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,9));
        hand.addCard(new Card(1,10));
        hand.addCard(new Card(1,12));
        hand.addCard(new Card(1,13));
        assert.equal(RoyalFlush(hand), false);

        hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(2,10));
        hand.addCard(new Card(1,11));
        hand.addCard(new Card(1,12));
        hand.addCard(new Card(1,13));
        assert.equal(RoyalFlush(hand), false);
    });
});
