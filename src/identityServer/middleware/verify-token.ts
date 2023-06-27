import JSONWebToken, { VerifyErrors } from "jsonwebtoken";
import bearerToken from "express-bearer-token";
import { Request, Response, NextFunction} from "express";

async function verify(request: Request, response: Response, next: NextFunction) {
    
    if (!request.token) {
    // No token, no pass
      return response.sendStatus(401);
  }
  // Decode token
  const decoded = JSONWebToken.decode(request.token, { complete: true });
  
  if (!decoded?.header.kid) {
    // No kid, no pass, we didn't generate this
      return response.sendStatus(401); 
  }
  const store = request.app.locals.store;
//   access token secrete
  const keyInformation = await store.get(`jwt-key:${decoded.header.kid}`)
      .then((value: string) => {JSON.parse(value)})
      .catch(() => undefined);

  if (!(keyInformation && keyInformation.algorithm && keyInformation.publicKey)) {
       // No key information to compare to, will be true if using local storage should be fine when using db
      return response.sendStatus(401);
  }
  const verified = await new Promise(
       resolve => JSONWebToken.verify(
           request.token!,
           keyInformation.publicKey,
            {
                algorithms: [
                  // Only allow the one that was stored with the key 
                  keyInformation.algorithm
                ]
            },
      (error: VerifyErrors | null, verified: any) => resolve(error ? undefined : verified)
    )
  );
  
  if (!verified) {
       // Not valid 
      return response.sendStatus(403); //invalid token
  }
  // Add our identity to the request
  if (request.user) {
    request.user = {
        id: 'test'
        // verified.sub
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