import * as sql from "mssql";
import { ENV } from "../../config/dot-env"
const config: sql.config = {
    user: ENV.MSSQL_USER,
    password: ENV.MSSQL_PASS,
    server: ENV.MSSQL_SERVER || "",
    database: ENV.MSSQL_DB_NAME,
    options: {
      trustServerCertificate: true, // this is probs a vulnerability
    },
  };
export async function userExists (username: string) {
    let pool;
    try {
      pool = await sql.connect(config)
      const request = pool.request();
      request.input('username', sql.VarChar, username);
      const result = await request.execute('userExists');
      await pool.close();
      return result.recordset.length > 0;
    }
    catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
  }


export  async function registerUser (player_id: string, username: string, hashPassword: string) {
    let pool;
    try {
      pool = await sql.connect(config)
      const request = pool.request();
      request.input('player_id', sql.VarChar, player_id);
      request.input('username', sql.VarChar, username);
      request.input('hashPassword', sql.VarChar, hashPassword);
      
      const result = await request.execute('registerPlayer');
      await pool.close();
      return result.recordset
    }
    catch (error) {
      throw error;
    }
}

export async function getPlayer(username: string) {
        let pool;
        try {
            pool = await sql.connect(config)
            const request = pool.request()
            request.input('username', sql.VarChar, username);
            const result = await request.execute("getPlayer");   
            await pool.close(); 
            return result.recordset;
    }
    catch (error) {
      throw error;
    }
}

export async function saveToken(identity:string, token_id: string, algorithm: string, publicKey: string, expiresAt: any) {
    let pool;
    try {
        pool = await sql.connect(config)
        const request = pool.request()
        request.input('player_id', sql.VarChar, identity);
        request.input('token_id', sql.VarChar, token_id);
        request.input('algo', sql.VarChar, algorithm);
        request.input('publicKey', sql.VarChar, publicKey);
        request.input('expireAt', sql.BigInt, expiresAt);
        const result = await request.execute("insertToken");   
        await pool.close(); 
        return result.recordset;
}
catch (error) {
  throw error;
}
}


export async function getToken(token_id: string) {
    let pool;
    try {
        pool = await sql.connect(config)
        const request = pool.request()
        request.input('token_id', sql.VarChar, token_id);
        const result = await request.execute("getToken");   
        await pool.close(); 
        return result.recordset;
}
catch (error) {
  throw error;
}
}