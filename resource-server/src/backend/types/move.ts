import { PlacedTile } from "./placed-tile";

export type Move = {
  player: 0 | 1;
  turn: number;
  score: number;
  placedTiles: PlacedTile[];
};
