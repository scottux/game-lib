(function () {
    'use strict';

    let Poker = require('../../demo/lib/poker');
    let players = ['Player One', 'Player Two', 'Player Three', 'Player Four'];

    document.getElementById('console').innerHTML = Poker(players, 'html');
}());
