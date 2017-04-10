'use strict';

// We have defined a poker game using the game library.
let Poker = require('./lib/poker');

// Play our game by defining who is playing, the game is set to log the winner automatically.
Poker([
    'Player One',
    'Player Two',
    'Player Three',
    'Player Four'
]);
