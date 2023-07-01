import { Int } from "mssql";
import { Game } from "../types";
import { DbConnection } from "./db-connection";

export namespace Games {
  export const getGamesByPlayer = async (playerId: number) => {
    const result = await DbConnection.runQuery(
      `SELECT [gameId]
      ,[playerId]
      ,[playerOneScore]
      ,[playerTwoScore]
      ,[moveCount]
      FROM [dbo].[Game]
      WHERE [playerId] = @playerId`,
      { queryParam: "playerId", paramType: Int(), value: playerId }
    );

    return result.recordset as Game[];
  };

  export const postNewGame = async (playerId: number): Promise<Game> => {
    const result = await DbConnection.runQuery(
      `INSERT INTO Game
      (playerId, playerOneScore, playerTwoScore, moveCount)
      VALUES (@playerId, 0, 0, 0);
      SELECT SCOPE_IDENTITY() AS id;`,
      { queryParam: "playerId", paramType: Int(), value: playerId }
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
      SET playerOneScore = @playerOneScore,
      playerTwoScore = @playerTwoScore,
      moveCount = @moveCount
      WHERE gameId = @gameId
      `,
      {
        queryParam: "playerOneScore",
        paramType: Int(),
        value: game.playerOneScore,
      },
      {
        queryParam: "playerTwoScore",
        paramType: Int(),
        value: game.playerTwoScore,
      },
      { queryParam: "moveCount", paramType: Int(), value: game.moveCount },
      { queryParam: "gameId", paramType: Int(), value: game.gameId }
    );

    return result.rowsAffected[0] === 1;
  };
}
