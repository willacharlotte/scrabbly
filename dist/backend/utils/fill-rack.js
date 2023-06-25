"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillRack = void 0;
const getAvailTiles = (tileBag) => {
    let k;
    const availTiles = [];
    for (k in tileBag) {
        const count = tileBag[k];
        if (count > 0)
            availTiles.push({
                letter: k,
                count: count,
            });
    }
    return availTiles;
};
const popRandomTile = (tileBag) => {
    const availTiles = getAvailTiles(tileBag);
    const length = availTiles.length;
    if (length === 0)
        return null;
    const randomIndex = Math.floor(Math.random() * length);
    const randomLetter = availTiles[randomIndex].letter;
    tileBag[randomLetter] =
        tileBag[randomLetter] - 1;
    return randomLetter;
};
const fillRack = (rack, tileBag) => {
    while (rack.tiles.length < 7) {
        const randomTile = popRandomTile(tileBag);
        if (randomTile === null)
            break;
        rack.tiles.push(randomTile);
    }
    return rack;
};
exports.fillRack = fillRack;
