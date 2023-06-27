import argon from "argon2";
import crypto from "crypto";
import JSONWebToken from "jsonwebtoken";
import ms from "ms";
import UUID from "pure-uuid";
import express, { Request, Response, NextFunction } from "express";
import { Users } from "../../dal";

// login

async function getIdentityForUsernamePasswordCredentials(request: Request, response: Response) {
  if (typeof request.body.username !== "string" || request.body.username.length < 1) {
      return response.sendStatus(400); 
  }
  // We aren't validating the length here except for requiring at least one character
  // the verification that it is correct will be done by comparing the hash
  if (typeof request.body.password !== "string" || request.body.password.length < 1) {
      return response.sendStatus(400); 
  }
  
     // We're going to validate our password here and then return the associated identity
    //  const store = request.app.locals.store;
     const username = request.body.username.trim();
     // check if user exist
    //  const foundUser = store.get((player: { username: any; }) => player.username === username);
    //  if (!foundUser)

     const lowerCaseUsername = username.toLowerCase();
     if (!await Users.doesUsernameExist(lowerCaseUsername)){
      return response.sendStatus(401); //unauthorised
     }
     const credentialsKey = `credentials:${lowerCaseUsername}`;

    //  const passwordInformation =
      await Users.getUserPassword(lowerCaseUsername);
    //  console.log(passwordInformation)
    //  if passwordInformation is undefined then user doesnt exist
    //  const passwordObj = JSON.parse(passwordInformation);

    //  if (!(passwordInformation && passwordObj.hash && passwordObj.identity)) {
    //       response.sendStatus(401);
          
    //    // Already handled
    //    return undefined;
    //  }
    //  const match = await argon.verify(passwordObj.hash, request.body.password);
    //  if (!match) {
    //      response.sendStatus(401); //unauthorized
    //    return undefined;
    //  }

    //  console.log(passwordObj.identity)
    //  return passwordObj.identity;
  
}

async function getIdentityForCredentials(request: Request, response: Response) {
    switch(request.body.from) {
     case "username-password": return getIdentityForUsernamePasswordCredentials(request, response);
     default: response.sendStatus(400);
   }
}

async function createKeyPair() {
  // create a key pair for use with jsonwebtoken
  return new Promise<{ publicKey:any, privateKey:any }>(
    (resolve, reject) => crypto.generateKeyPair(
      'rsa', 
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem"
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem"
        }
      }, 
      (error, publicKey, privateKey) => error ? reject(error) : resolve({ publicKey, privateKey })
    )
  );
}

async function generateBearerTokenCredentials(request: Request, response:Response, identity: any) {
  //generate our token
  const { publicKey, privateKey } = await createKeyPair();
  const expiryInMS = ms("1 day");
  const expiresAtInMS = Date.now() + expiryInMS;
  const payload = {
      sub: identity,
    // exp is in **seconds**, not milliseconds
    // Floor so that we have an integer
    exp: Math.floor(expiresAtInMS / 1000)
  };
  const keyid = new UUID(4).format();
  const algorithm = "RS256";
  const token = await new Promise(
    (resolve, reject) => JSONWebToken.sign(
        payload,
        //access token secrete
      privateKey,
      {
        algorithm,
        keyid
      },
      (error: any, token: any) => error ? reject(error) : resolve(token)
    )
  );

  // const refreshToken = await new Promise(
  //   (resolve, reject) => JSONWebToken.sign(
  //       identity,
  //       //refresh token secrete
  //       refreshTokenSecrete,
  //     (error: any, refreshToken: any) => error ? reject(error) : resolve(refreshToken)
  //   )
  // );

  // const otherUsers = db.filter(player => player.username !== foundUser.username);
  // const currentUser = {...foundUser, refreshToken}
  // DbConnection.setUsers([...otherUsers, currentUser]);

  const store = request.app.locals.store;

  await store.put(`jwt-key:${keyid}`, JSON.stringify({
    algorithm,
    publicKey
  }));

  await new Promise<void>(
    (resolve, reject) => request.app.locals.store.put(
      `jwt-key:${keyid}`, 
      expiryInMS,
          (error: any) => error ? reject(error) : resolve()
    )
  );
  // access token
  response.json({
    token,
    tokenType: "bearer",
    expiresAt: expiresAtInMS
  });
  // response.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: 'true' maxAge: 24 * 60* 60*1000}); //one day
}

async function generateCredentials(request: Request, response: Response, identity: any) {
     switch(request.body.to) {
    case "bearer": return generateBearerTokenCredentials(request, response, identity);
    default: response.sendStatus(400);
  }
}

function handleExchangeCredentialsRoute(request: Request, response: Response, next: NextFunction) {
    if (!request.body) {
    return response.sendStatus(400);
  }
  getIdentityForCredentials(request, response)
      .then(identity => {
        if (!identity) {
           return;
      };
        return generateCredentials(request, response, identity); 
      })
      .catch(next);
}


export default [
  express.json(),
  handleExchangeCredentialsRoute
];