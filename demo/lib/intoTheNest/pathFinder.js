'use strict';

const TileTypes = require('./tileTypes');
const PassableTileTypes = [
    TileTypes.Blank,
    TileTypes.DoorOpen,
    TileTypes.Floor,
    TileTypes.Hallway
];

function Pathfinder(start, end, tiles) {
    console.log('generating new path', start, end);

    let pathStart = start;
    let pathEnd = end;
    let mapTiles = tiles;
    let mapHeight = mapTiles.length;
    let mapWidth = mapTiles[0].length;
    let queue = [];
    let doorPath = [];
    let activeTile;
    let previousActiveTile;
    let visitedMap = getVisitedMap();

    let deepCount = 0;
    let doorFound = null;

    return findPath();

    function findPath () {
        //let startTile = mapTiles[start.y-1][start.x-1];

        console.log('finding path, start tile:',pathStart);

        setTileVisited(pathStart);
        queue.push(pathStart);
        doorPath = addNextTiles();

        return doorPath;
    }

    function setTileVisited (tile) {
        let x = tile.x-1;
        let y = tile.y-1;

        console.log('Setting visited tile:',tile);

        visitedMap[y][x] = true;
    }

    function tileHasBeenVisited (tile) {
        let x = tile.x-1;
        let y = tile.y-1;

        return visitedMap[y][x];
    }

    function tileIsPassable (tile) {
        for( let type of PassableTileTypes ) {
            if (tile.type === type) {
                return 1;
            }
        }

        return 0;
    }

    function getVisitedMap() {
        let vMap = [];

        for (let i = 0; i < mapTiles.length; i++) {
            vMap [i] = [];
            for (let j = 0; j < mapTiles[0].length; j++) {
                vMap[i][j] = false;
            }
        }

        return vMap;
    }

    function addTiles () {
        let eligibleTiles = checkSurroundingTiles();

        queue.push.apply(queue, eligibleTiles);
    }

    function checkTile (location) {
        let tile;

        if (location.y < 0 || location.y >= mapHeight-1) {
            return 0;
        }
        if (location.x < 0 || location.x >= mapWidth-1) {
            return 0;
        }

        tile = mapTiles[location.y][location.x];
        if (tileHasBeenVisited(tile)) {
            return 0;
        }
        if (isEndDoor(tile)) {
            tile.previous = activeTile;
            doorFound = tile;
        }

        return tileIsPassable(tile);
    }

    function isEndDoor (tile) {
        return (tile === pathEnd);
    }

    function checkSurroundingTiles () {
        console.log('Checking surrounding tiles', activeTile);
        let walkableSurroundingTiles = [];
        let activeLocation = activeTile;

        let topLocation = {
            x: activeLocation.x,
            y: activeLocation.y - 1
        };

        let rightLocation = {
            x: activeLocation.x + 1,
            y: activeLocation.y
        };

        let bottomLocation = {
            x: activeLocation.x,
            y: activeLocation.y + 1
        };

        let leftLocation = {
            x: activeLocation.x - 1,
            y: activeLocation.y
        };

        let locations = [
            topLocation,
            rightLocation,
            bottomLocation,
            leftLocation
        ];

        for ( let location of locations ) {
            if(checkTile(location)) {
                let tile = mapTiles[location.y-1][location.x-1];
                setTileVisited(tile);
                tile.previous = activeTile;
                walkableSurroundingTiles.push(tile);
            }
        }

        return walkableSurroundingTiles;
    }

    function printQueue () {
        let row = '';
        for (let tile in queue) {
            row += queue[tile].x + ', ' + queue[tile].y + '  ';
        }
        console.log(row);
    }

    function tracePath () {
        let currentStep = doorFound;
        let path = [];
        let count = 0;
        do {

            console.log('Tracing path:',currentStep);
            path.push(currentStep);
            currentStep = currentStep.previous;
            count++;
        } while (currentStep !== pathStart && count < 50000);

        path.shift();
        return path;
    }

    function addNextTiles () {
        console.log("Finding Door path", deepCount);
        if(deepCount > 50000) {
            return deepCount;
        }
        if(activeTile) {
            previousActiveTile = activeTile;
        }
        activeTile = queue.shift();
        if (activeTile) {
            if(doorFound) {
                console.log('DOOR FOUND: ', doorFound.location);
                return tracePath();
            }
            addTiles();
            deepCount++;
            return addNextTiles();
        } else {
            return false;
        }
    }
}

module.exports = Pathfinder;
