import { VarChar } from "mssql";
import { DbConnection } from "./db-connection";

export namespace Users {
  export const getPlayerIdByUsername = async (username: string) => {
    const result = await DbConnection.runQuery(
      `SELECT player_id FROM Player
      WHERE username = @username`,
      { queryParam: "username", paramType: VarChar(), value: username }
    );
    return result.recordset[0].player_id! as string;
  };
}
