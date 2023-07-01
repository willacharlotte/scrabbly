import { Request, Response } from "express";
import { Games, Users } from "../dal";

export const getGamesByPlayer = async (req: Request, res: Response) => {
  try {
    const playerId = await Users.getPlayerIdByUsername(req.params.username);
    res.end(JSON.stringify(await Games.getGamesByPlayer(playerId)));
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(JSON.stringify(message));
  }
};

export const postGame = async (req: Request, res: Response) => {
  try {
    const playerId = await Users.getPlayerIdByUsername(req.body.username);
    const game = await Games.postNewGame(playerId);
    res.end(JSON.stringify(game));
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(JSON.stringify(message));
  }
};

export const putGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const success = await Games.putGame({
      gameId: gameId,
      ...req.body,
    });

    if (success) res.end("Success");
    else throw new Error("More than one row affected");
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(JSON.stringify(message));
  }
};
