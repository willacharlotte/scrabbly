import { Int, VarChar } from "mssql";
import { Game } from "../types";
import { DbConnection } from "./db-connection";

export namespace Games {
  export const getGamesByPlayer = async (playerId: string) => {
    const result = await DbConnection.runQuery(
      `SELECT [game_id]
      ,[player_id]
      ,[player_one_score]
      ,[player_two_score]
      ,[move_count]
      FROM [dbo].[Game]
      WHERE [player_id] = @player_id`,
      { queryParam: "player_id", paramType: VarChar(36), value: playerId }
    );

    return result.recordset as Game[];
  };

  export const postNewGame = async (playerId: string): Promise<Game> => {
    const result = await DbConnection.runQuery(
      `INSERT INTO Game
      (player_id, player_one_score, player_two_score, move_count)
      VALUES (@player_id, 0, 0, 0);
      SELECT SCOPE_IDENTITY() AS id;`,
      { queryParam: "player_id", paramType: VarChar(36), value: playerId }
    );

    return {
      gameId: result.recordset[0].id,
      playerId: playerId,
      playerOneScore: 0,
      playerTwoScore: 0,
      moveCount: 0,
    };
  };

  export const putGame = async (game: Game) => {
    const result = await DbConnection.runQuery(
      `UPDATE [dbo].[Game]
      SET player_one_score = @player_one_score,
      player_two_score = @player_two_score,
      move_count = @move_count
      WHERE game_id = @game_id
      `,
      {
        queryParam: "player_one_score",
        paramType: Int(),
        value: game.playerOneScore,
      },
      {
        queryParam: "player_two_score",
        paramType: Int(),
        value: game.playerTwoScore,
      },
      { queryParam: "move_count", paramType: Int(), value: game.moveCount },
      { queryParam: "game_id", paramType: Int(), value: game.gameId }
    );

    return result.rowsAffected[0] === 1;
  };
}
