(function () {
    'use strict';

    let Poker = require('../../demo/lib/poker');
    let SnakesAndLadders = require('../../demo/lib/snakesAndLadders');
    let Board = require('../../lib/board');
    let Die = require('../../lib/die');
    let gameDie = new Die(6);
    let players = ['Player One', 'Player Two', 'Player Three', 'Player Four'];

    document.getElementById('coin-output').innerHTML = require('../../demo/lib/coinFlip');
    document.getElementById('dice-output').innerHTML = gameDie.roll() +' and a '+ gameDie.roll();
    document.getElementById('poker-output').innerHTML = Poker(players, 'html');
    document.getElementById('snakesAndLadders-output').innerHTML = Board.toHtml(SnakesAndLadders);
}());
