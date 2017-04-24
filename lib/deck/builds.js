'use strict';

let builds = {
    euchre: function (deck, PlayingCard) {
        for (let i = 0; i < 4; i++) {
            for (let j = 9; j < 15; j++) {
                deck.push(new PlayingCard(j, i % 4 + 1));
            }
        }

        return deck;
    },

    /**
     *
     * @param {Deck|Array} deck
     * @param {PlayingCard|Function} PlayingCard
     * @returns {*}
     */
    standard: function (deck, PlayingCard) {
        for (let i = 0; i < 52; i++) {
            deck.push(new PlayingCard(i % 13 + 1, i % 4 + 1));
        }

        return deck;
    },

    /**
     * A standard set of cards, with jokers
     * @param {Deck|Array} deck
     * @param {PlayingCard|Function} PlayingCard
     * @returns {*}
     */
    jokers: function (deck, PlayingCard) {
        deck = builds.standard(deck, PlayingCard);
        deck.push(new PlayingCard(0,0), new PlayingCard(0,0));

        return deck;
    }
};

module.exports = builds;
