import { Game, Move, User } from "../types";
import { createNewGame, newPlacedTilesFromMove, updateRack } from "../utils";

export namespace Games {
  // TODO put this in db
  const games: Game[] = [];

  const getIndexById = (id: number) => {
    return games.findIndex((game) => game.id === id);
  };

  const getGreatestId = () => {
    return games
      .map((game) => game.id)
      .reduce((prev, next) => (prev > next ? prev : next), 0);
  };

  export const getGames = () => {
    return games;
  };

  export const getGameById = (id: number) => {
    const gameIndex = getIndexById(id);
    if (gameIndex === -1)
      throw new Error("game with specified id does not exist");

    return games[gameIndex];
  };

  export const postNewGame = (users: User[]): Game => {
    const id = getGreatestId() + 1;
    const newGame = createNewGame(users, id);

    games.push(newGame);

    return newGame;
  };

  export const putMoveInGame = (id: number, move: Move) => {
    const game = getGameById(id);

    const newPlacedTiles = newPlacedTilesFromMove(move);

    if (
      move.firstLetterLocation.col.toUpperCase() ===
      move.firstLetterLocation.col
    )
      throw new Error("firstLetterLocation needs to have a lower case col");

    game.players[move.playerNumber].rack = updateRack(
      newPlacedTiles,
      game.players[move.playerNumber].rack,
      game.tiles
    );

    game.moves.push(move);
    game.placedTiles.push(...newPlacedTiles);

    return game;
  };

  export const deleteGame = (id: number) => {
    const gameIndex = getIndexById(id);
    if (gameIndex === -1)
      throw new Error("game with specified id does not exist");

    games.splice(gameIndex, 1);
    return true;
  };
}
