import express from "express";

import { getGamesByPlayer, postGame, putGame } from "../../controllers";

export const gamesRoute = express.Router();

gamesRoute.route("/games").post(postGame);
gamesRoute.route("/games/:username").get(getGamesByPlayer);

gamesRoute.route("/games/:id").put(putGame);
