import { Move } from "./move";

/**
 * @type Game
 * @field players {index{number}: string} index being either 1, 2, 3 or 4 in starting order.
 * @field moves {Move[]} list of moves made in the game
 */
export type Game = {
  players: { [index: number]: string };
  moves: Move[];
};
