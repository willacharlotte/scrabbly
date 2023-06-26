import * as sql from "mssql";
import { ENV } from "../utils";

export namespace DbConnection {
  const config: sql.config = {
    user: ENV.MSSQL_USER,
    password: ENV.MSSQL_PASS,
    server: ENV.MSSQL_SERVER || "",
    database: ENV.MSSQL_DB_NAME,
    options: {
      trustServerCertificate: true, // this is probs a vulnerability
    },
  };

  /**
   *
   * @param query - a query string with parameters preceded by an '@' symbol.
   * Example: 'SELECT * FROM Table WHERE ID = &#64;id
   * @param queryParams - parameters in the form of:
   * { queryParam: key of the parameter, paramType: mssql.ISqlType type of the paramter, value: value to insert }
   * @returns promise containing an mssql.IResult object
   */
  export const runQuery = async (
    query: string,
    ...queryParams: {
      queryParam: string;
      paramType: sql.ISqlType;
      value: any;
    }[]
  ) => {
    const pool = await sql.connect(config);
    const request = pool.request();
    queryParams.forEach((param) =>
      request.input(param.queryParam, param.paramType, param.value)
    );
    return request.query(query);
  };
}
