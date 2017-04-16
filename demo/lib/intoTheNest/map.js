'use strict';

const Board = require('../../../lib/board');
const randomNumber = require('../../../lib/utils/randomNumber');
const Room = require('./room');
const Hallway = require('./hallway');
const TileTypes = require('./tileTypes');

/**
 * @alias module:Map
 * @constructor
 */
function Map() {
    let map;
    let maxHeight = 25;
    let maxWidth = 25;
    let numberOfRooms = 5;

    let minX = 1;
    let minY = 1;
    let maxX = maxWidth - 1;
    let maxY = maxHeight - 1;

    let rooms = [];

    this.getRandomMap = function () {
        map = new Board(maxWidth, maxHeight);
        generateRooms();
        //generateHallways();

        return map;
    };

    function generateRooms () {
        for (let i = 0; i < numberOfRooms; i++) {
            let room;
            let location;
            do {
                location = generateRandomPointOnMap();
                room = new Room(0, 0, location);
            } while(!roomFitsInLocation(room, location));

            rooms.push(room);
            placeFeature(room);
        }
    }

    function generateRandomPointOnMap () {
        return {
            x: randomNumber(minX, maxX),
            y: randomNumber(minY, maxY)
        };
    }

    function roomFitsInLocation (room, location) {
        return fitsOnMap(room, location) && !isOverlappingRoom(room, location);
    }

    function fitsOnMap (room, location) {
        return (((room.width + location.x) < maxX) && ((room.height + location.y) < maxY));
    }

    function isOverlappingTile (tileType) {
        return (tileType === TileTypes.Floor || tileType === TileTypes.Wall);
    }

    function isOverlappingRoom (room, location) {
        let overlap = false;

        room.eachSpace(function (space) {
            let mapSpace = getMapLocation(location, space);

            if(mapSpace && isOverlappingTile(mapSpace.type)) {
                overlap = true;
            }
        });

        return overlap;
    }

    function getMapLocation(location, space){
        let y = location.y + (space.y-1);
        let x = location.x + (space.x-1);

        return map.getSpace(x, y);
    }

    function placeFeature (feature) {
        feature.eachSpace(function (space) {
            let mapSpace = getMapLocation(feature.location, space);

            if (mapSpace) {
                mapSpace.type = space.type;
            }
        });
    }

    function getAllDoors () {
        let allDoors = [];

        for (let i = 0; i < rooms.length; i++) {
            allDoors.push.apply(allDoors, rooms[i].doors);
        }
        return allDoors;
    }
    //
    // function filterThisRoom (thisRoom) {
    //     return function (room) {
    //         return room !== thisRoom;
    //     }
    // }
    //
    function filterTheseDoors (theseDoors) {
        return function (door) {
            for (let thisDoor of theseDoors) {
                if (theseDoors[thisDoor] === door) {
                    return false;
                }
            }
            return true;
        }
    }
    //
    // function placeHallway () {
    //
    // }
    //
    /**
     * Will connect every door in a room to another door in another room
     */
    function generateHallways () {
        let theseDoors;
        let otherDoors;
        let thisRoom;
        let allDoors = getAllDoors();

        // For each room
        for (let i = 0; i < rooms.length; i++) {
            thisRoom = rooms[i];
            theseDoors = thisRoom.doors;
            otherDoors = allDoors.filter(filterTheseDoors(theseDoors));

            let hallway;
            for (let j = 0; j < theseDoors.length; j++) {
                let randomDoorIndex = randomNumber(0, otherDoors.length-1);
                let endDoor = otherDoors[randomDoorIndex];
                otherDoors.slice(randomDoorIndex);
                hallway = new Hallway(theseDoors[j], endDoor, map);
                placeFeature(hallway);
            }
        }
    }
}

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
