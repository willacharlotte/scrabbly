import express from "express";
import argon from "argon2";
import crypto from "crypto";
import JSONWebToken from "jsonwebtoken";
import ms from "ms";
import UUID from "pure-uuid";
import { Request, Response, NextFunction } from "express";
import { getPlayer, saveToken } from "./database";

async function getIdentityForUsernamePasswordCredentials(
  request: Request,
  response: Response
) {
  if (
    typeof request.body.username !== "string" ||
    request.body.username.length < 1
  ) {
    return response.sendStatus(400);
  }
  // We aren't validating the length here except for requiring at least one character
  // the verification that it is correct will be done by comparing the hash
  if (
    typeof request.body.password !== "string" ||
    request.body.password.length < 1
  ) {
    return response.sendStatus(400);
  }
  // We're going to validate our password here and then return the associated identity
  const username = request.body.username.trim();

  const userInfo = await getPlayer(username);

  if (!(userInfo && userInfo[0]?.hashPassword && userInfo[0]?.player_id)) {
    response.sendStatus(401);

    // Already handled
    return undefined;
  }
  const match = await argon.verify(userInfo[0].hashPassword, request.body.password);
  if (!match) {
    response.sendStatus(401);
    // Already handled
    return undefined;
  }
  return userInfo[0].player_id;
}

async function getIdentityForCredentials(request: Request, response: Response) {
  switch (request.body.from) {
    case "username-password":
      return getIdentityForUsernamePasswordCredentials(request, response);
    default:
      response.sendStatus(400);
  }
}

async function createKeyPair() {
  // create a key pair for use with jsonwebtoken
  return new Promise<{ publicKey: any; privateKey: any }>((resolve, reject) =>
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (error, publicKey, privateKey) =>
        error ? reject(error) : resolve({ publicKey, privateKey })
    )
  );
}

async function generateBearerTokenCredentials(
  request: Request,
  response: Response,
  identity: any
) {
  //generate our token
  const { publicKey, privateKey } = await createKeyPair();
  const expiryInMS = ms("1 day");
  const expiresAtInMS = Date.now() + expiryInMS;
  const payload = {
    sub: identity,
    // exp is in **seconds**, not milliseconds
    // Floor so that we have an integer
    exp: Math.floor(expiresAtInMS / 1000),
  };
  const keyid = new UUID(4).format();
  const algorithm = "RS256";
  const token = await new Promise((resolve, reject) =>
    JSONWebToken.sign(
      payload,
      privateKey,
      {
        algorithm,
        keyid,
      },
      (error, token) => (error ? reject(error) : resolve(token))
    )
  );


  await saveToken(identity, keyid, algorithm, publicKey, expiresAtInMS )

  response.json({
    token,
    tokenType: "bearer",
    expiresAt: expiresAtInMS,
  });
}

async function generateCredentials(
  request: Request,
  response: Response,
  identity: any
) {
  switch (request.body.to) {
    case "bearer":
      return generateBearerTokenCredentials(request, response, identity);
    default:
      response.sendStatus(400);
  }
}

function handleExchangeCredentialsRoute(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.body) {
    return response.sendStatus(400);
  }
  getIdentityForCredentials(request, response)
    .then((identity) => {
      if (!identity) {
        return;
      }
      return generateCredentials(request, response, identity);
    })
    .catch(next);
}

export default [express.json(), handleExchangeCredentialsRoute];
