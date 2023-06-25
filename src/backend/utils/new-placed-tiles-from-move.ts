import { Location, Move, PlacedTile } from "../types";

const cols = "abcdefghijklmno";

const nextLocationDown = (current: Location): Location | null => {
  if (current.row === 15) return null;

  return {
    col: current.col,
    row: (current.row + 1) as typeof current.row,
  };
};

const nextLocationAcross = (current: Location): Location | null => {
  if (current.col === "o") return null;

  const nextColIndex = cols.indexOf(current.col) + 1;

  return {
    col: cols.charAt(nextColIndex) as typeof current.col,
    row: current.row,
  };
};

const nextLocation = (current: Location, direction: "DOWN" | "ACROSS") => {
  let next;
  switch (direction) {
    case "DOWN":
    default:
      next = nextLocationDown(current);
      break;
    case "ACROSS":
      next = nextLocationAcross(current);
  }

  if (!next) throw new Error("Next location is out of bounds");

  return next;
};

export const newPlacedTilesFromMove = (move: Move): PlacedTile[] => {
  const placedTiles: PlacedTile[] = [];
  const unpackedWord = [...move.word];

  let isNewLetter = unpackedWord.at(0) !== "(";
  let currentLocation: Location = move.firstLetterLocation;

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
