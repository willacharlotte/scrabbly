import express from "express";
import exchangeCredentialsHandler from '../../identityServer/handlers/auth'

export const exchangeCredentialsRoute = express.Router();

exchangeCredentialsRoute.post("/exchange-credentials", exchangeCredentialsHandler)