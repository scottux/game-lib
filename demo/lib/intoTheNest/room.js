'use strict';

const randomNumber = require('../../../lib/utils/randomNumber');
const Board = require('../../../lib/board');
const Space = require('../../../lib/space');
const TileTypes = {
    Blank: '.',
    DoorClosed: 'D',
    DoorOpen: 'O',
    Floor: '_',
    Hallway: 'H',
    Wall: '#'
};

let count = 0;

/**
 * A very basic square room
 * @constructor
 */
function Room(width, height, location) {
    /**
     * Min height a room can have
     * @private
     * @type {Number}
     */
    let minHeight = 3;
    /**
     * Min width a room can have
     * @private
     * @type {Number}
     */
    let minWidth = 3;

    /**
     * Max height a room can have
     * @private
     * @type {Number}
     */
    let maxHeight = 10;

    /**
     * Max width a room can have
     * @private
     * @type {Number}
     */
    let maxWidth = 10;

    /**
     * Min number of doors a room can have
     * @private
     * @type {Number}
     */
    let minDoors = 2;

    /**
     * Max number of doors a room can have
     * @private
     * @type {Number}
     */
    let maxDoors = 2;

    /**
     * A unique identifier for the room
     * @type {Number}
     */
    this.id = count++;
    
    /**
     * Height of the room
     * @type {Number}
     */
    this.height = height || minHeight;
    
    /**
     * Width of the room
     * @type {Number}
     */
    this.width = width || minWidth;
    
    /**
     * The door Spaces
     * @type {Array}
     */
    this.doors = [];
    
    /**
     * Map to a location in a larger map Board.
     * @type {Object} x,y
     */
    this.location = location;

    // Set dimensions of the room.
    this.setDimensions(minHeight, minWidth, maxHeight, maxWidth);
    // call the parent constructor, pass in a new build routine to set Space.type
    Board.call(this, this.height, this.width, function (x, y) {
        let space = new Space(x, y);
        space.type = TileTypes.Floor;

        return space;
    });
    // Add doors to the room
    this.setDoors(minDoors, maxDoors);
}
// Extend a Board
Room.prototype = Object.create(Board.prototype);

/**
 * Sets the maximum height and width of the room
 * @param minHeight
 * @param minWidth
 * @param maxHeight
 * @param maxWidth
 */
Room.prototype.setDimensions = function (minHeight, minWidth, maxHeight, maxWidth) {
    this.height = randomNumber(minHeight, maxHeight);
    this.width = randomNumber(minWidth, maxWidth);
};
/**
 * Picks a random number of doors and places them in the walls
 */
Room.prototype.setDoors = function (minDoors, maxDoors) {
    let numDoors = randomNumber(minDoors, maxDoors);
    let edgeTiles = this.gatherEdgeTiles();


    do {
        let index = randomNumber(0, edgeTiles.length-1);
        let space = index < edgeTiles.length ? edgeTiles[index] : null;

        if (space && !this.isCornerTile(space)) {
            space.type = TileTypes.DoorClosed;
            this.doors.push(space);
            edgeTiles.splice(index, 1);
            numDoors--;
        }
    } while (numDoors > 0);
};

/**
 * Gets all the tiles along the edge.
 * @returns {Array}
 */
Room.prototype.gatherEdgeTiles = function () {
    let edgeTiles = [];
    let room = this;

    this.eachSpace(function (space) {
        if(room.isWallTile(space)) {
            space.type = TileTypes.Wall;
            edgeTiles.push(space);
        }
    });

    return edgeTiles;
};

/**
 *
 * @param {Space} space
 * @returns {Boolean}
 */
Room.prototype.isWallTile = function (space) {
    return this.isFirstRow(space) || this.isFirstCol(space) || this.isLastRow(space) || this.isLastCol(space);
};

/**
 *
 * @param {Space} space
 * @returns {Boolean}
 */
Room.prototype.isCornerTile = function (space) {
    let isVertEdge = this.isFirstCol(space) || this.isLastCol(space);

    return (this.isFirstRow(space) && isVertEdge) || (this.isLastRow(space) && isVertEdge);
};

/**
 * Prints a Room
 */
Room.toString = function (room) {
    let str = '';

    for (let i = 1; i <= room.length; i++) {
        for (let j = 1; j <= room[i-1].length; j++) {
            str += room.getSpace(j,i).type + ' ';
        }
        str += "\r\n";
    }

    return str;
};

/**
 * Prints a Room
 */
Room.toHtml = function (room) {
    let str = '<table class="into-the-nest">';

    for (let i = 1; i <= room.length; i++) {
        str += '<tr>';
        for (let j = 1; j <= room[i-1].length; j++) {
            let wallType = room.getSpace(j,i).type;
            wallType = (wallType === '#') ? 'wall' : wallType;
            wallType = (wallType === '_') ? 'floor' : wallType;
            wallType = (wallType === 'D') ? 'door-closed' : wallType;
            wallType = (wallType === 'O') ? 'door-open' : wallType;
            str += '<td class="tile-'+wallType+'">&nbsp;</td>';
        }
        str += '</tr>';
    }
    str += '</table>';

    return str;
};

module.exports = Room;
