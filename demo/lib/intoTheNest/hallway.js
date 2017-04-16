'use strict';

const Board = require('../../../lib/board');
const Space = require('../../../lib/space');
const Pathfinder = require('./pathFinder');
const TileTypes = require('./tileTypes');

/**
 * @alias module: Hallway
 * @param start
 * @param end
 * @param map
 * @constructor
 */
function Hallway(start, end, map) {
    let path = new Pathfinder(start, end, map);

    this.start = start;
    this.end = end;
    this.location = {x: 0, y: 0};
    getNullMap();
    this.setTiles(path);

    function getNullMap () {
        for (let i = 0; i < map.length; i++) {
            this[i] = [];
        }
    }


}

Hallway.prototype = Object.create(Board.prototype);

Hallway.prototype.setTiles = function (path) {
    for (let tile of path) {
        let space = new Space(tile.x, tile.y);

        space.type = TileTypes.Hallway;
        this[tile.y-1][tile.x-1] = space;
    }
};

// Hallway.toString = function (hallway) {
//     let row;
//     for (let i = 0; i < map.length; i++) {
//         row = '';
//         for (let j = 0; j < map[0].length; j++) {
//             if(hallway[i][j]) {
//                 row += hallway[i][j].type + ' ';
//             }
//             else {
//                 row += '  ';
//             }
//         }
//         console.log(row);
//     }
//     console.log('');
// }

module.exports = Hallway;
