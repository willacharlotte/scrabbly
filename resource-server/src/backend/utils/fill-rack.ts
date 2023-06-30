import { Rack, TileBag } from "../types";

const getAvailTiles = (tileBag: TileBag) => {
  let k: keyof TileBag;

  const availTiles = [];

  for (k in tileBag) {
    const count = tileBag[k];
    if (count > 0)
      availTiles.push({
        letter: k as string,
        count: count,
      });
  }
  return availTiles;
};

const popRandomTile = (tileBag: TileBag) => {
  const availTiles = getAvailTiles(tileBag);
  const length = availTiles.length;

  if (length === 0) return null;

  const randomIndex = Math.floor(Math.random() * length);

  const randomLetter = availTiles[randomIndex].letter;

  tileBag[randomLetter as keyof TileBag] =
    tileBag[randomLetter as keyof TileBag] - 1;

  return randomLetter;
};

export const fillRack = (rack: Rack, tileBag: TileBag) => {
  while (rack.tiles.length < 7) {
    const randomTile = popRandomTile(tileBag);
    if (randomTile === null) break;

    rack.tiles.push(randomTile);
  }
  return rack;
};
