# Game Library

## Classes

### Card

Represents a playing card.

- Suit: Numeric representation of the card's suit. 1-4
- Number: The card's number, 1-13
- Value: The card's number is not always its value. e.g. Ace is 1 or 14.
- Symbol: The symbol to use for display. &diams;, &hearts;, &spades;,&clubs;.
- toValue(card) Helpful in mappings.
- toString(card) Helpful in output.
- toSuit(card) Helpful in mappings.

### Deck

Represents a deck of playing cards.

- Cards: The deck is primarily a set of cards.
- hit() Take the top card off the deck, to deal it out.
- shuffle() Shuffle the deck, randomizes the card array.

### Player

Represents a player of the game.

- Name: The player's name for identification purposes.
- Hand: The player has a hand of cards.
- fromName(name) Creates a new player from a string name.
- toHand(player) Useful for mappings.

### Hand

Represents a player's hand or a discard pile.

- Cards: The set of cards in this hand.
- getSortedValues() Returns the values of the hand sorted low to high.
- toString(hand) For output.

### Die

Represents a polyhedron for use in various games.

`let coin = new Die(2);`

- Sides: Number of sides for the polyhedron. 2 sides is a coin, 6 sides is a regular die, 20 for initiative
- roll() Roll the die, flip the coin.

### Board

This is useful for creating board games. Goes good with Die and Player.

- Grid: The Board is constructed with a width and height, x and y. This makes an array of rows(y) with arrays of cells(x)
- getSpace() Returns the space defined at the provided coordinates

### Space

This is a spot in the Board's grid. It can have properties aside from these, as you need them (think lava tiles!).

- X: The x coordinate of this space in the Board
- Y: The y coordinate of this space in the Board.
- onLanding(player) This function is called when a player lands on a space.
- getOccupied() The list of players in this space. 

## Demos

`npm start` or `node index`

This will run a local demo server that you can visit at http://localhost:3000 as well as run a quick demo in the console.

`node demo/poker` or `npm run poker`

This will run the same poker demo as in the browser, but using output for the console.

`node demo/coinFlip` or `npm run coin`

This will run the same coin flip demo as in the browser.

`node demo/snakesAndLadders` or `npm run snakesAndLadders`

This will run a simple snakes and ladders-type grid game. Still early in dev.
