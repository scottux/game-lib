'use strict';

const isStraight = require('../../../../demo/lib/checks/isStraight');
const assert = require('chai').assert;

describe('Check: isStraight', function () {
    it('should return true if all are consecutive', function () {
        assert.equal(isStraight([1,2,3,4,5]), true);
        assert.equal(isStraight('12345'), true);
    });
    it('should return false if not', function () {
        assert.equal(isStraight([1,1,1,1,1]), false);
        assert.equal(isStraight([1,2,3,4,7]), false);
        assert.equal(isStraight('23467'), false);
    });
});
