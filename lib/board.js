'use strict';

const Space = require('./space');

/**
 * @param {Number} width Max X of the grid
 * @param {Number} height Max y of the grid
 * @constructor
 */
function Board(width, height) {
    /**
     * @type Array[Space[]]
     */
    let grid = range(1, height + 1).map(function (y) {
        return range(1, width + 1).map(function (x) {
            return new Space(x, y);
        });
    });

    grid.forEach(function (row) {
        this.push(row);
    }, this);
}
Board.prototype = [];

/**
 * @param {Number} x The x property of the space
 * @param {Number} y The y property of the space
 * @returns {Space}
 */
Board.prototype.getSpace = function(x, y) {
    let row = this[y - 1];

    return row ? row[x - 1] : null;
};

/**
 *
 * @param space
 * @returns {{n: Space|null, e: Space|null, s: Space|null, w: Space|null, ne: Space|null, nw: Space|null, se: Space|null, sw: Space|null}}
 */
Board.prototype.getNeighbors = function (space) {
    let east = space.x+1;
    let north = space.y+1;
    let west = space.x-1;
    let south = space.y-1;
    let n = this.getSpace(space.x,north);
    let e = this.getSpace(east, space.y);
    let s = this.getSpace(space.x, south);
    let w = this.getSpace(west, space.y);

    return {
        n: n,
        e: e,
        s: s,
        w: w,
        ne: n && e ?  this.getSpace(east,north) : null, // no point in checking these if they can't exist
        nw: n && w ? this.getSpace(west,north) : null,
        se: s && e ?  this.getSpace(east,south) : null,
        sw: s && w ? this.getSpace(west,south) : null,
    };
};

/**
 * Returns an HTML Table Element
 * @param {Board} board The board to convert.
 * @returns {String} HTML String
 */
Board.toHtml = function (board) {
    let str = '<table class="game-board">';

    for (let i = board.length-1; i >= 0 ; i--) {
        str += '<tr>';

        for (let j = 0; j < board[i].length; j++) {
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
