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

    it('should getNeighbors', function () {
        let board = new Board(5,5);
        let space = board.getSpace(2,2);

        assert.equal(board.getNeighbors(space).n.y, 3);
        assert.equal(board.getNeighbors(space).n.x, 2);

        assert.equal(board.getNeighbors(space).s.y, 1);
        assert.equal(board.getNeighbors(space).s.x, 2);

        assert.equal(board.getNeighbors(space).e.y, 2);
        assert.equal(board.getNeighbors(space).e.x, 3);

        assert.equal(board.getNeighbors(space).w.y, 2);
        assert.equal(board.getNeighbors(space).w.x, 1);

        assert.equal(board.getNeighbors(space).ne.y, 3);
        assert.equal(board.getNeighbors(space).ne.x, 3);

        assert.equal(board.getNeighbors(space).nw.y, 3);
        assert.equal(board.getNeighbors(space).nw.x, 1);

        assert.equal(board.getNeighbors(space).sw.y, 1);
        assert.equal(board.getNeighbors(space).sw.x, 1);

        assert.equal(board.getNeighbors(space).se.y, 1);
        assert.equal(board.getNeighbors(space).se.x, 3);
    });

    it('should getNeighbors', function () {
        let board = new Board(5,5);
        let space = board.getSpace(1,1);

        assert.equal(board.getNeighbors(space).s, null);
        assert.equal(board.getNeighbors(space).w, null);
        assert.equal(board.getNeighbors(space).sw, null);
        assert.equal(board.getNeighbors(space).se, null);
        space = board.getSpace(5,5);
        assert.equal(board.getNeighbors(space).n, null);
        assert.equal(board.getNeighbors(space).e, null);
        assert.equal(board.getNeighbors(space).nw, null);
        assert.equal(board.getNeighbors(space).ne, null);
    });

    it('should get a random space', function () {
        let board = new Board(5,5);
        let space = board.getRandomSpace();

        assert.instanceOf(space, Space);
        assert.isAtLeast(space.x, 1);
        assert.isAtLeast(space.y, 1);
        assert.isAtMost(space.x, 5);
        assert.isAtMost(space.y, 5);
    });
});
