'use strict';

module.exports = isStraight;

/**
 * Are all values of the array sequential?
 * @param {Array|String} values
 * @returns {Boolean}
 */
function isStraight(values) {
    let straight = false;

    for (let i = 0; i < values.length-1; i++) {
        straight = parseInt(values[i])+1 === parseInt(values[i+1]);
        if (!straight) {
            break;
        }
    }

    return straight;
}
