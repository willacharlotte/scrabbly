import express from "express";
import createCredentialsHandler from "../../identityServer/handlers/register";

export const registerRoute = express.Router();

registerRoute.post("/create-credentials", createCredentialsHandler);