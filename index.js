'use strict';

let deckBuilder = require('./lib/deck/builder');
let gameDeck = deckBuilder();
let Player = require('./lib/player');
let playerOne = new Player('Player One');
let Die = require('./lib/die');
let regularDie = new Die(6);

let http = require('http');
let finalHandler = require('finalhandler');
let serveStatic = require('serve-static');
// Serve up public folder
let serve = serveStatic('public', {'index': ['index.html', 'index.htm']});
// Create server
let server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalHandler(req, res))
});

gameDeck.shuffle();

console.log('Welcome,', playerOne.name);
console.log('Top Card:', gameDeck.hit().getFullName());
console.log('Die Roll:', regularDie.roll());

// Serve at port 3000
server.listen(3000);
console.log("Visit http://localhost:3000 for public demo. Or try: npm run poker, or, npm run coin.");
