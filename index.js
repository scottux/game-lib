'use strict';

let Deck = require('./lib/deck');
let Die = require('./lib/die');
let Player = require('./lib/player');
let gameDeck = new Deck();
let regularDie = new Die(6);
let playerOne = new Player('Player One');

gameDeck.shuffle();

console.log('Welcome,', playerOne.name);
console.log('Top Card:', gameDeck.hit().getFullName());
console.log('Die Roll:', regularDie.roll());
