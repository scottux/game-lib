'use strict';

let Die = require('../lib/die');

console.log(new Die(2).roll() % 2 ? 'Heads' : 'Tails');
