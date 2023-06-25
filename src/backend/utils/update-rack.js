"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRack = void 0;
const fill_rack_1 = require("./fill-rack");
const popTileIfMatchesLetter = (letter, tiles) => {
    const tileIndex = tiles.findIndex((tile) => {
        const tileLetter = tile.letter === tile.letter.toLowerCase()
            ? "_"
            : tile.letter.toLowerCase();
        return letter === tileLetter;
    });
    return tileIndex === -1 ? null : tiles.splice(tileIndex, 1)[0];
};
const updateRack = (newPlacedTiles, rack, tileBag) => {
    const newTilesCopy = JSON.parse(JSON.stringify(newPlacedTiles));
    rack.tiles = rack.tiles.filter((letter) => popTileIfMatchesLetter(letter, newTilesCopy) === null);
    if (newTilesCopy.length !== 0)
        throw new Error("rack didn't contain one or more newly placed tiles");
    return (0, fill_rack_1.fillRack)(rack, tileBag);
};
exports.updateRack = updateRack;
