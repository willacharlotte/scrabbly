import { Location } from "./location";

/**
 * @type Move
 * @field playerNumber {1|2|3|4} depicts each player, in their starting order.
 * @field turn {number} consists of each player making a move.
 * @field word {string} follows standard scrabble notation, with already placed tiles.
 * being surrounded by parenthesis. Other words created in other directions are ommitted
 * and inferred from other turns and the score. Blank tiles are notated with a lowercase.
 *
 * Example 1: (C)ODE would be tiles ODE placed on existing tile C.
 *
 * Example 2: (PROGRAM)mERS would be tiles mERS placed on existing tiles PROGRAM, with m being a blank.
 *
 * @field location {Location} the location of the first PLACED tile. For example,
 * the first placed tile of (C)ODE would be O.
 * @field direction {"DOWN"|"ACROSS"} the direction of the placed word
 * @field score { number } the score of the move
 * @field cumulativeScore {number} the total score of the player
 *
 */
export type Move = {
  playerNumber: 0 | 1 | 2 | 3;
  turn: number;
  word: string;
  firstLetterLocation: Location;
  direction: "DOWN" | "ACROSS";
  score: number;
  cumulativeScore: number;
};
