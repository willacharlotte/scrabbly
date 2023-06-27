import express from "express";
import createCredentialsHandler from "../../backend/service/handlers/register.js";

export const registerRoute = express.Router();

registerRoute.post("/create-credentials", createCredentialsHandler);