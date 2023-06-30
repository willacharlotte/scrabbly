import { Game, TileBag, User } from "../types";
import { fillRack } from "./fill-rack";
import { createNewTileBag } from "./create-new-tile-bag";

const newPlayerFromUser = (user: User, tileBag: TileBag) => {
  return {
    user: user,
    rack: fillRack(
      {
        tiles: [],
      },
      tileBag
    ),
  };
};

export const createNewGame = (users: User[], gameId: number): Game => {
  const tileBag = createNewTileBag();
  const players = users.map((user) => newPlayerFromUser(user, tileBag));
  users.forEach((user) => user.games.push(gameId));

  return {
    id: gameId,
    players: players,
    moves: [],
    placedTiles: [],
    tiles: tileBag,
  };
};
