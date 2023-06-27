import express from "express";
import bearer from "../../backend/service/middleware/verify-bearer";

export const authenticationRoute = express.Router();

authenticationRoute.get("/check-authentication", bearer, (request: express.Request, response: express.Response) => response.send("`You're authenticated!"));