import express from "express";

import {
    getSquares,
    getTiles,
  } from "../../backend/controllers";

  export const boardRoute = express.Router();

  boardRoute.route('/squares').get(getSquares);
  boardRoute.route('/tiles').get(getTiles);