import { PlacedTile } from "./placed-tile";
import { Rack } from "./rack";
import { TileBag } from "./tile-bag";

export type GameState = {
  turn: number;
  scores: {
    playerOne: number;
    playerTwo: number;
  };
  racks: {
    playerOne: Rack;
    playerTwo: Rack;
  };
  bag: TileBag;
  placedTiles: PlacedTile[];
};
