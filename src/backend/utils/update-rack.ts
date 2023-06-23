import { PlacedTile, Rack, TileBag } from "../types";
import { fillRack } from "./fill-rack";

const popTileIfMatchesLetter = (
  letter: string,
  tiles: PlacedTile[]
): PlacedTile | null => {
  const tileIndex = tiles.findIndex((tile) => {
    const tileLetter =
      tile.letter === tile.letter.toLowerCase()
        ? "_"
        : tile.letter.toLowerCase();
    return letter === tileLetter;
  });

  return tileIndex === -1 ? null : tiles.splice(tileIndex, 1)[0];
};

export const updateRack = (
  newPlacedTiles: PlacedTile[],
  rack: Rack,
  tileBag: TileBag
) => {
  const newTilesCopy: PlacedTile[] = JSON.parse(JSON.stringify(newPlacedTiles));
  rack.tiles = rack.tiles.filter(
    (letter) => popTileIfMatchesLetter(letter, newTilesCopy) === null
  );

  if (newTilesCopy.length !== 0)
    throw new Error("rack didn't contain one or more newly placed tiles");

  return fillRack(rack, tileBag);
};
