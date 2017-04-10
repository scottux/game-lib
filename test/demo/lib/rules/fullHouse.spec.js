'use strict';

const FullHouse = require('../../../../demo/lib/rules/fullHouse');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/Card');

const assert = require('chai').assert;

describe('Rule: Full House', function () {
    it('should return true if triple/pair ', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(2,1));
        hand.addCard(new Card(3,1));
        hand.addCard(new Card(1,2));
        hand.addCard(new Card(4,2));
        assert.equal(FullHouse(hand), true);
    });

    it('should return false if not', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(4,7));
        hand.addCard(new Card(1,9));
        assert.equal(FullHouse(hand), false);
    });

    it('should return if pair/triple', function () {
        let hand = new Hand();

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(4,1));
        hand.addCard(new Card(1,2));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,2));
        assert.equal(FullHouse(hand), true);
    });
});
