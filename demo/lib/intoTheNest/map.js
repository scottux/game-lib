'use strict';

const Board = require('../../../lib/board');
const randomNumber = require('../../../lib/utils/randomNumber');
const Room = require('./room');
const Hallway = require('./hallway');
const TileTypes = require('./tileTypes');

/**
 *
 * @param width
 * @param height
 * @param roomCount
 * @constructor
 */
function Map(width, height, roomCount) {
    this.height = height;
    this.width = width;
    this.rooms = [];

    Board.call(this, width, height);

    this.generateRooms(roomCount);
    //this.generateHallways();
}
// Map is a Board
Map.prototype = Object.create(Board.prototype);

/**
 * Generates a given number of rooms on the map
 * @param {Number} numberOfRooms
 */
Map.prototype.generateRooms = function (numberOfRooms) {
    for (let i = 0; i < numberOfRooms; i++) {
        let room;
        let location;

        do {
            location = this.getRandomSpace();
            room = new Room(0, 0, location);
        } while(!this.roomFitsInLocation(room, location));

        this.rooms.push(room);
        this.placeFeature(room);
    }
};

/**
 * Does the room fit in the random location of the map?
 * @param room
 * @param location
 * @returns {boolean}
 */
Map.prototype.roomFitsInLocation =  function (room, location) {
    return this.fitsOnMap(room, location) && !this.isOverlappingRoom(room, location);
};

/**
 * Does the room fit on the map
 * @param room
 * @param location
 * @returns {boolean}
 */
Map.prototype.fitsOnMap = function (room, location) {
    return (room.width + location.x) < this[0].length && (room.height + location.y) < this.length;
};

/**
 * Is the room overlapping another room?
 * @param room
 * @param location
 * @returns {boolean}
 */
Map.prototype.isOverlappingRoom = function (room, location) {
    let overlap = false;
    let map = this;

    room.eachSpace(function (space) {
        let mapSpace = map.getMapLocation(location, space);

        if(mapSpace && isOverlappingTile(mapSpace.type)) {
            overlap = true;
        }
    });

    return overlap;
};

/**
 * Overwrite the map space tiles to be the feature's space tiles, placing the feature in the map
 * @param {Room|Hallway} feature
 */
Map.prototype.placeFeature = function (feature) {
    let map = this;

    feature.eachSpace(function (space) {
        let mapSpace = map.getMapLocation(feature.location, space);

        if (mapSpace) {
            mapSpace.type = space.type;
        }
    });
};

/**
 * Gets the map location corresponding to the feature.
 * @param location
 * @param space
 * @returns {Space}
 */
Map.prototype.getMapLocation = function (location, space){
    let y = location.y + space.y;
    let x = location.x + space.x;

    return this.getSpace(x, y);
};

/**
 * Will connect every door in a room to another door in another room
 */
Map.prototype.generateHallways = function () {
    let otherDoors;
    let allDoors = this.getAllDoors();

    // For each room
    for (let room of this.rooms) {
        otherDoors = allDoors.filter(filterTheseDoors(room.doors));

        let hallway;
        for (let door of room.doors) {
            let randomDoorIndex = randomNumber(0, otherDoors.length-1);
            let endDoor = otherDoors[randomDoorIndex];
            otherDoors.slice(randomDoorIndex);
            hallway = new Hallway(door, endDoor, this);
            this.placeFeature(hallway);
        }
    }
};

/**
 *
 * @returns {Array} All doors in all rooms.
 */
Map.prototype.getAllDoors = function () {
    let allDoors = [];

    for (let room of this.rooms) {
        allDoors.push.apply(allDoors, room.doors);
    }

    return allDoors;
};

/**
 *
 * @param board
 * @returns {string}
 */
Map.toString = function (board) {
    let str = '';

    for(let i = -1; i < board.length; i++) {
        for(let j = -1; j < board[0].length; j++) {
            if(i !== -1 && j !== -1) {
                board[i][j].type = board[i][j].type || TileTypes.Blank;
                str += board[i][j].type + ' ';
            } else if (j === -1 ) {
                if(i === -1 ) {
                    str += '  ';
                } else {
                    str += i%10 + ' ';
                }
            } else {
                str += j%10 + ' ';
            }
        }
        str += "\r\n";
    }
    str += "\r\n";

    return str;
};

/**
 *
 * @param board
 * @returns {string}
 */
Map.toHtml = function (board) {
    let str = '<table class="into-the-nest">';

    for(let i = 0; i < board.length; i++) {
        str += "<tr>";
        for(let j = 0; j < board[0].length; j++) {
            let wallType = board[i][j].type || 'blank';

            wallType = (wallType === '#') ? 'wall' : wallType;
            wallType = (wallType === '_') ? 'floor' : wallType;
            wallType = (wallType === 'D') ? 'door-closed' : wallType;
            wallType = (wallType === 'O') ? 'door-open' : wallType;
            str += '<td class="tile-'+wallType+'">&nbsp;</td>';
        }
        str += "</tr>";
    }
    str += "</table>";

    return str;
};

module.exports = Map;

/**
 * @private
 * @param theseDoors
 * @returns {Function}
 */
function filterTheseDoors(theseDoors) {
    return function (door) {
        for (let thisDoor of theseDoors) {
            if (thisDoor === door) {
                return false;
            }
        }
        return true;
    }
}

/**
 * @private
 * @param tileType
 * @returns {boolean}
 */
function isOverlappingTile(tileType) {
    return tileType === TileTypes.Floor || tileType === TileTypes.Wall;
}
