import express from "express";

import {
    getGame,
    getGames,
    postGame,
    putMove,
    deleteGame,
  } from "../../controllers";

export const gamesRoute = express.Router();

gamesRoute.route('/games')
    .get(getGames)
    .post(postGame);

gamesRoute.route('/games/:id')
    .get(getGame)
    .delete(deleteGame);

gamesRoute.route('/games/:id/move')
    .put(putMove);