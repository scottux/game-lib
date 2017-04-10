'use strict';

let Die = require('../../lib/die');

module.exports = new Die(2).roll() % 2 ? 'Heads' : 'Tails';
