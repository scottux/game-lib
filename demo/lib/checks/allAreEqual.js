'use strict';

module.exports = allAreEqual;

/**
 * Are all values of the array equal?
 * @param {Array} values
 * @returns {Boolean}
 */
function allAreEqual(values) {
    for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[0]) {
            return false;
        }
    }

    return true;
}
