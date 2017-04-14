'use strict';

const Space = require('../../lib/space');
const assert = require('chai').assert;

describe('Space', function() {
    let space;

    it('should construct a space properly', function () {
        space = new Space(1, 2);
        assert.instanceOf(space, Space);
        assert.equal(space.x, 1);
        assert.equal(space.y, 2);
    });

    it('should have an onLanding event', function () {
        let player = {};

        space.onLanding(player);
        assert.equal(player.currentSpace, space);
    });

    it('should have a player occupying it', function () {
        assert.deepEqual(space.occupants, [{currentSpace: space}]);
    });
});
