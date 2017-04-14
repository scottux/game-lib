'use strict';

module.exports = deckBuilder;

/**
 *
 * @param {Deck|Function} [Deck] The deck to build
 * @param {Card} [Card] The type of card to use
 * @param {Function} [build] The method for populating the deck. Params: The deck instance and the Card reference
 * @returns {Deck}
 */
function deckBuilder(Deck, Card, build) {
    Card = Card || require('../playingCard');
    Deck = Deck || require('../deck');
    build = build || require('./builds').standard;
    let deck = new Deck();

    build(deck, Card);

    return deck.shuffle();
}
