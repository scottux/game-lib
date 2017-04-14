'use strict';

const FullHouse = require('../../../../demo/lib/rules/fullHouse');
const Hand = require('../../../../lib/Hand');
const Card = require('../../../../lib/playingCard');

const assert = require('chai').assert;

describe('Rule: Full House', function () {
    it('should return true if triple/pair ', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,2));
        hand.addCard(new Card(1,3));
        hand.addCard(new Card(2,1));
        hand.addCard(new Card(2,4));
        assert.equal(FullHouse(hand), true);
    });

    it('should return false if not', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(3,3));
        hand.addCard(new Card(7,4));
        hand.addCard(new Card(9,1));
        assert.equal(FullHouse(hand), false);
    });

    it('should return if pair/triple', function () {
        let hand = new Hand(5, Card);

        hand.addCard(new Card(1,1));
        hand.addCard(new Card(1,4));
        hand.addCard(new Card(2,1));
        hand.addCard(new Card(2,2));
        hand.addCard(new Card(2,3));
        assert.equal(FullHouse(hand), true);
    });
});
