 'use strict';
//
// const Board = require('../lib/board');
// const randomNumber = require('../../lib/utils/randomNumber');
//
 const Room = require('./lib/intoTheNest/room');
//
// /**
//  * @module MapGenerator
//  */
// module.exports = Map;
//
// /**
//  * @alias module:Map
//  * @constructor
//  */
// function Map() {
//     let map;
//     let maxHeight = 25;
//     let maxWidth = 25;
//     let numberOfRooms = 5;
//
//     let minX = 1;
//     let minY = 1;
//     let maxX = maxWidth - 1;
//     let maxY = maxHeight - 1;
//
//     let rooms = [];
//
//     this.getRandomMap = function () {
//         map = new Board(maxWidth, maxHeight);
//         generateRooms();
//         generateHallways();
//         return map;
//     };
//
//     function generateRooms () {
//         for (let i = 0; i < numberOfRooms; i++) {
//             let room;
//             let location;
//             do {
//                 location = generateRandomPointOnMap();
//                 room = new Room(location);
//             } while(!roomFitsInLocation(room, location));
//
//             rooms.push(room);
//             placeFeature(room);
//         }
//     }
//
//     function generateRandomPointOnMap () {
//         return {
//             x: randomNumber(minX, maxX),
//             y: randomNumber(minY, maxY)
//         };
//     }
//
//     function roomFitsInLocation (room, location) {
//         return fitsOnMap(room, location) && !isOverlappingRoom(room, location);
//     }
//
//     function fitsOnMap (room, location) {
//         return (((room.width + location.x) < maxX) && ((room.height + location.y) < maxY));
//     }
//
//     function isOverlappingTile (tileType) {
//         return (tileType === TileTypes.Floor || tileType === TileTypes.Wall);
//     }
//
//     function isOverlappingRoom (room, location) {
//         let tiles = room.tiles;
//
//         for (let i = 0; i < tiles.length; i++) {
//             let yPosition = location.y + i;
//             for (let j = 0; j < tiles[i].length; j++) {
//                 let xPosition = location.x + j;
//                 if(isOverlappingTile(map[yPosition][xPosition].type)) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     }
//
//     function placeFeature (feature) {
//         let tiles = feature.tiles;
//         let location = feature.location;
//
//         for (let i = 0; i < tiles.length; i++) {
//             let yPosition = location.y + i;
//             for (let j = 0; j < tiles[i].length; j++) {
//                 let xPosition = location.x + j;
//                 if (feature.tiles[i][j]) {
//                     map[yPosition][xPosition] = tiles[i][j];
//                 }
//             }
//         }
//     }
//
//     function getAllDoors () {
//         let allDoors = [];
//
//         for (let i = 0; i < rooms.length; i++) {
//             allDoors.push.apply(allDoors, rooms[i].doors);
//         }
//         return allDoors;
//     }
//
//     function filterThisRoom (thisRoom) {
//         return function (room) {
//             return room !== thisRoom;
//         }
//     }
//
//     function filterTheseDoors (theseDoors) {
//         return function (door) {
//             for (let thisDoor in theseDoors) {
//                 if (theseDoors[thisDoor] === door) {
//                     return false;
//                 }
//             }
//             return true;
//         }
//     }
//
//     function placeHallway () {
//
//     }
//
//     /**
//      * Will connect every door in a room to another door in another room
//      */
//     function generateHallways () {
//         let theseDoors;
//         let otherDoors;
//         let thisRoom;
//         let allDoors = getAllDoors();
//
//         // For each room
//         for (let i = 0; i < rooms.length; i++) {
//             thisRoom = rooms[i];
//             theseDoors = thisRoom.doors;
//             otherDoors = allDoors.filter(filterTheseDoors(theseDoors));
//
//             let hallway;
//             for (let j = 0; j < theseDoors.length; j++) {
//                 let randomDoorIndex = Utilities.generateRandomNumber(0, otherDoors.length-1);
//                 let endDoor = otherDoors[randomDoorIndex];
//                 otherDoors.slice(randomDoorIndex);
//                 hallway = new Hallway(theseDoors[j], endDoor, map);
//                 placeFeature(hallway);
//             }
//         }
//     }
// }
//
// Map.toString = function (board) {
//     let row;
//     for(let i = -1; i < board.length; i++) {
//         row = '';
//         for(let j = -1; j < board[0].length; j++) {
//             if(i !== -1 && j !== -1) {
//                 row += board[i][j].type + ' ';
//             } else if (j === -1 ) {
//                 if(i === -1 ) {
//                     row += '  ';
//                 } else {
//                     row += i%10 + ' ';
//                 }
//             } else {
//                 row += j%10 + ' ';
//             }
//         }
//         console.log(row);
//     }
//     console.log('');
// };

console.log(Room.toString(new Room({x:5,y:5})));
