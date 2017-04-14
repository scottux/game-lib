'use strict';

const FourOfAKind = require('../../../../demo/lib/rules/fourOfAKind');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Four of a Kind', function () {
    it('should return high value if four values match', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,2));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(9,1));
        hand.addCard(new Card(1,4));
        assert.equal(FourOfAKind(hand).highestValue, 14);
    });

    it('should return false if not', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,2));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(7,4));
        hand.addCard(new Card(9,1));
        assert.equal(FourOfAKind(hand, 0), false);
    });

    it('should return false if high value too low', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(2,1));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(2,3));
        hand.addCard(new Card(2,4));
        hand.addCard(new Card(9,1));
        assert.equal(FourOfAKind(hand, 3), false);
    });
});
