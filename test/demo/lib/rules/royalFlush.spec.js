'use strict';

const RoyalFlush = require('../../../../demo/lib/rules/royalFlush');
const Hand = require('../../../../lib/hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Royal Flush', function () {
    it('should return true if royal flush', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(10,1));
        hand.addCard(new Card(11,1));
        hand.addCard(new Card(12,1));
        hand.addCard(new Card(13,1));
        assert.equal(RoyalFlush(hand), true);
    });

    it('should return false if not', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(9,1));
        hand.addCard(new Card(10,1));
        hand.addCard(new Card(12,1));
        hand.addCard(new Card(13,1));
        assert.equal(RoyalFlush(hand), false);

        hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(20,1));
        hand.addCard(new Card(11,1));
        hand.addCard(new Card(12,1));
        hand.addCard(new Card(13,1));
        assert.equal(RoyalFlush(hand), false);
    });
});
