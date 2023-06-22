import { Move } from "./move";
import { Rack } from "./rack";
import { TileBag } from "./tile-bag";
import { User } from "./user";

/**
 * @type Game
 * @field id [number]
 * @field players {{user: User, rack: Rack}[]} the players in starting order
 * @field tiles {TileBag} the current bag of tiles in the game
 * @field moves {Move[]} list of moves made in the game
 */
export type Game = {
  id: number;
  players: {
    user: User;
    rack: Rack;
  }[];
  tiles: TileBag;
  moves: Move[];
  // todo: maybe add placed tiles?
};
