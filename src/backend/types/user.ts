/**
 * @type User
 * @field username {string} unique identifier of the user
 * @field games {number[]} list of the ids of the games they're a part of
 */
export type User = {
  username: string;
  games: number[];
  // anything else??
};
