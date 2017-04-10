'use strict';

const Die = require('../../lib/die');
const assert = require('chai').assert;

describe('Die', function () {
    // live and...
    let die;

    it('should construct a die properly', function () {
        die = new Die(6);
        assert.instanceOf(die, Die);
        assert.equal(die.sides, 6);
    });

    it('should roll a number less than or equal to sides', function () {
        assert.isNumber(die.roll());
        assert.isAtMost(die.roll(), 6);
    });
});