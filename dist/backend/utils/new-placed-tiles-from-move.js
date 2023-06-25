"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPlacedTilesFromMove = void 0;
const cols = "abcdefghijklmno";
const nextLocationDown = (current) => {
    if (current.row === 15)
        return null;
    return {
        col: current.col,
        row: (current.row + 1),
    };
};
const nextLocationAcross = (current) => {
    if (current.col === "o")
        return null;
    const nextColIndex = cols.indexOf(current.col) + 1;
    return {
        col: cols.charAt(nextColIndex),
        row: current.row,
    };
};
const nextLocation = (current, direction) => {
    let next;
    switch (direction) {
        case "DOWN":
        default:
            next = nextLocationDown(current);
            break;
        case "ACROSS":
            next = nextLocationAcross(current);
    }
    if (!next)
        throw new Error("Next location is out of bounds");
    return next;
};
const newPlacedTilesFromMove = (move) => {
    const placedTiles = [];
    const unpackedWord = [...move.word];
    let isNewLetter = unpackedWord.at(0) !== "(";
    let currentLocation = move.firstLetterLocation;
    unpackedWord.forEach((c, i) => {
        if (c === "(") {
            isNewLetter = false;
            return;
        }
        if (c === ")") {
            isNewLetter = true;
            return;
        }
        if (isNewLetter) {
            placedTiles.push({
                letter: c,
                location: currentLocation,
            });
        }
        if (i < unpackedWord.length - 1)
            currentLocation = nextLocation(currentLocation, move.direction);
    });
    return placedTiles;
};
exports.newPlacedTilesFromMove = newPlacedTilesFromMove;
