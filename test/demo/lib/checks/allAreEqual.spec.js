'use strict';

const allAreEqual = require('../../../../demo/lib/checks/allAreEqual');
const assert = require('chai').assert;

describe('Check: allAreEqual', function () {
    it('should return true if all are equal', function () {
        assert.equal(allAreEqual([1,1,1,1,1]), true);
        assert.equal(allAreEqual('11111'), true);
        assert.equal(allAreEqual([true, true, true]), true);
    });
    it('should return false if not equal', function () {
        assert.equal(allAreEqual([1,2,3,4,5]), false);
        // strict
        assert.equal(allAreEqual([1,'1',1,1,1]), false);
    });
});
