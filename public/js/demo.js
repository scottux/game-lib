(function () {
    'use strict';

    let Poker = require('../../demo/lib/poker');
    let players = ['Player One', 'Player Two', 'Player Three', 'Player Four'];

    document.getElementById('poker-output').innerHTML = Poker(players, 'html');
}());
