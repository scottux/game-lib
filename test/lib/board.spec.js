'use strict';

const Board = require('../../lib/board');
const Space = require('../../lib/space');
const assert = require('chai').assert;

describe('Board', function() {
    let board;
    let gridSize = 9;

    it('should construct a board properly', function () {
        board = new Board(gridSize, gridSize);
        assert.instanceOf(board, Board);
    });

    it('should have a grid', function () {
        assert.equal(board.length, gridSize);
        for (let row of board) {
            assert.equal(row.length, gridSize);
        }
    });

    it('should get a Space by coordinates', function () {
        let space = board.getSpace(1, 2);

        assert.instanceOf(space, Space);
        assert.equal(space.x, 1);
        assert.equal(space.y, 2);
    });

    it('should produce HTML', function () {
        let board = new Board(1,1);

        assert.equal(Board.toHtml(board), '<table class="game-board"><tr><td class="space-1-1">1,1</td></tr></table>');
    });
});
