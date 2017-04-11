'use strict';

const Space = require('./space');

/**
 * @param {Number} x Max X of the grid
 * @param {Number} y Max y of the grid
 * @property {Array} grid An array of arrays of Spaces
 * @constructor
 */
function Board(x, y) {
    /**
     * @type Array[Space[]]
     */
    this.grid = range(1, y + 1).map(function (y) {
        return range(1, x + 1).map(function (x) {
            return new Space(x, y);
        });
    });

    /**
     * @param {Number} x The x property of the space
     * @param {Number} y The y property of the space
     * @returns {Space}
     */
    this.getSpace = function(x, y) {
        return this.grid[y - 1][x - 1];
    }
}

/**
 * Returns an HTML Table Element
 * @param {Board} board The board to convert.
 * @returns {String} HTML String
 */
Board.toHtml = function (board) {
    let str = '<table class="game-board">';

    for (let i = board.grid.length-1; i >= 0 ; i--) {
        str += '<tr>';

        for (let j = 0; j < board.grid[i].length; j++) {
            let x = j+1;
            let y = i+1;

            str += '<td class="space-'+x+'-'+y+'">';
            str += x+','+y;
            str += '</td>';
        }
        str += '</tr>';
    }
    str += '</table>';

    return str;
};

module.exports = Board;

/**
 * @example range(5); // [0,1,2,3,4]
 * @example range(1,4); // [1,2,3]
 */
function range(a, b) {
    let start;
    let stop;
    let R = [];

    if (typeof b === 'undefined') {
        start = 0;
        stop = a;
    } else {
        start = a;
        stop = b;
    }

    for (let i = start; i < stop; i++) {
        R.push(i);
    }

    return R;
}
