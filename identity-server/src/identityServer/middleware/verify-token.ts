import JSONWebToken, { VerifyErrors } from "jsonwebtoken";
import bearerToken from "express-bearer-token";
import { Request, Response, NextFunction} from "express";
import { getToken } from "../handlers/database";


declare module 'express' {
  interface Request {
    user?: any;
  }
}

async function verify(request: Request, response: Response, next: NextFunction) {
    
    if (!request.token) {
    // No token, no pass
      return response.sendStatus(401);
  }
  // Decode token
  const decoded = JSONWebToken.decode(request.token, { complete: true });
  
  if (!decoded?.header.kid) {
    // No kid, no pass, we didn't generate this token
      return response.sendStatus(401); 
  }

  const key: any = await getToken(decoded.header.kid);
  const keyInformation = key[0];

  if (!(keyInformation && keyInformation.algo && keyInformation.publicKey)) {
       // No key information to compare to, will be true if using local storage should be fine when using db
      return response.sendStatus(401);
  }
  const verified: any = await new Promise(
       resolve => JSONWebToken.verify(
           request.token!,
           keyInformation.publicKey,
            {
                algorithms: [
                  // Only allow the one that was stored with the key 
                  keyInformation.algo
                ]
            },
      (error: VerifyErrors | null, verified: any) => resolve(error ? undefined : verified)
    )
  );
  
  if (!verified) {
       // Not a valid token
      return response.sendStatus(403); //invalid token
  }
  // Add our identity to the request
  if (request.user) {
    request.user = {
        id:  verified.sub,
    };
  }
  
  next(undefined);
}

function handler(request: Request, response: Response, next: NextFunction) {
  verify(request, response, next)
      .catch(next);
}

export default [
  bearerToken(),
  handler
];