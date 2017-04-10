'use strict';

module.exports = tripleDouble;

/**
 * Are the first three values the same, then the 4th and 5th also the same?
 * @param {Array} values
 * @returns {Boolean}
 */
function tripleDouble(values) {
    const firstValue = values[0];

    return values.length && values[1] === firstValue && values[2] === firstValue && values[3] === values[4];
}
