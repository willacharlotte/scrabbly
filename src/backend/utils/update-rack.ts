import { PlacedTile, Rack, TileBag } from "../types";
import { fillRack } from "./fill-rack";

const popTileIfMatchesLetter = (
  letter: string,
  tiles: PlacedTile[]
): PlacedTile | null => {
  const tileIndex = tiles.findIndex((tile) => tile.letter === letter);

  return tileIndex === -1 ? null : tiles.splice(tileIndex, 1)[0];
};

export const updateRack = (
  newPlacedTiles: PlacedTile[],
  rack: Rack,
  tileBag: TileBag
) => {
  rack.tiles = rack.tiles.filter(
    (letter) => popTileIfMatchesLetter(letter, newPlacedTiles) === null
  );

  if (newPlacedTiles.length !== 0)
    throw new Error("rack didn't contain one or more newly placed tiles");

  return fillRack(rack, tileBag);
};
