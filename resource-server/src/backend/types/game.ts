import { Move } from "./move";
import { PlacedTile } from "./placed-tile";
import { Rack } from "./rack";
import { TileBag } from "./tile-bag";
import { User } from "./user";

/**
 * @type Game
 * @field id [number]
 * @field players {{user: User, rack: Rack}[]} the players in starting order
 * @field tiles {TileBag} the current bag of tiles in the game
 * @field placedTiles {PlacedTile[]} the tiles currently on the board
 * @field moves {Move[]} list of moves made in the game
 */
export type Game = {
  id: number;
  players: {
    user: User;
    rack: Rack;
  }[];
  tiles: TileBag;
  placedTiles: PlacedTile[];
  moves: Move[];
};
