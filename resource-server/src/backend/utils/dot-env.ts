import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  MSSQL_USER: process.env.MSSQL_USER || "",
  MSSQL_PASS: process.env.MSSQL_PASS || "",
  MSSQL_SERVER: process.env.MSSQL_SERVER || "",
  MSSQL_DB_NAME: process.env.MSSQL_DB_NAME || "",
};
