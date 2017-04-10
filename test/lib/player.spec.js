'use strict';

const Player = require('../../lib/player');
const Hand = require('../../lib/hand');
const assert = require('chai').assert;

describe('Player', function() {
    let player;

    it('should construct a player properly', function () {
        player = new Player('Foo');
        assert.instanceOf(player, Player);
        assert.instanceOf(player.hand, Hand);
        assert.equal(player.name, 'Foo');
    });

    it('should create a player from a name', function () {
        player = Player.fromName('Foo');
        assert.instanceOf(player, Player);
        assert.instanceOf(player.hand, Hand);
        assert.equal(player.name, 'Foo');
    });

    it('should map a player to a hand', function () {
        assert.equal(Player.toHand(player), player.hand);
    });
});
