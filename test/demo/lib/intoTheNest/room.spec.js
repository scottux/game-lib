'use strict';

const Room = require('../../../../demo/lib/intoTheNest/room');
const assert = require('chai').assert;

describe('Demo ItN: Room', function () {
    it('should construct a room', function () {
        let room = new Room({x:5,y:5});
        assert.instanceOf(room, Room);
    });

    it('should render a room', function () {
        let room = new Room({x:5,y:5});

        console.log(Room.toString(room));

        assert.isString(Room.toString(room));
        room = new Room();

        console.log(Room.toString(room));
        room = new Room();

        console.log(Room.toString(room));
        room = new Room();

        console.log(Room.toString(room));
        room = new Room();

        console.log(Room.toString(room));

    });
});
