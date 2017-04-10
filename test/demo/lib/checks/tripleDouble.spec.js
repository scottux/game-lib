'use strict';

const tripleDouble = require('../../../../demo/lib/checks/tripleDouble');
const assert = require('chai').assert;

describe('Check: tripleDouble', function () {
    it('should return true if 3 of a kind, then 2 of a kind', function () {
        assert.equal(tripleDouble([1,1,1,2,2]), true);
        assert.equal(tripleDouble('11122'), true);
        assert.equal(tripleDouble([true, true, true, false, false]), true);
    });
    it('should return false if not', function () {
        assert.equal(tripleDouble([1,2,3,4,5]), false);
        // strict
        assert.equal(tripleDouble([1,'1',1,2,2]), false);
    });
});
