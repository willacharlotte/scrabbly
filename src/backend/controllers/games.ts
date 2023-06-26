import { Request, Response } from "express";
import { Games, Users } from "../dal";
import { Move, User } from "../types";

export const getGames = (_: Request, res: Response) => {
  res.end(JSON.stringify(Games.getGames()));
};

export const getGame = (req: Request, res: Response) => {
  const gameId = req.params.id;
  console.log(gameId);
  try {
    const game = Games.getGameById(Number(gameId));
    res.end(JSON.stringify(game));
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};

export const postGame = (req: Request, res: Response) => {
  const users: User[] = Users.getUsersFromBodyUsers(req.body);
  const game = Games.postNewGame(users);

  res.end(JSON.stringify(game));
};

export const putMove = (req: Request, res: Response) => {
  const gameId = req.params.id;
  const move: Move = req.body;
  try {
    const game = Games.putMoveInGame(Number(gameId), move);
    res.end(JSON.stringify(game));
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};

export const deleteGame = (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    Games.deleteGame(Number(gameId));
    res.end();
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};
