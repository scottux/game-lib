(function () {
    'use strict';

    let Poker = require('../../demo/lib/poker');
    let players = ['Player One', 'Player Two', 'Player Three', 'Player Four'];

    document.getElementById('poker-output').innerHTML = Poker(players, 'html');

    let Die = require('../../lib/die');
    let gameDie = new Die(6);

    document.getElementById('coin-output').innerHTML = new Die(2).roll() % 2 ? 'Heads' : 'Tails';

    document.getElementById('dice-output').innerHTML = gameDie.roll() +' and a '+ gameDie.roll();
}());
