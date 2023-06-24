import { Request, Response } from "express";
import { Users } from "../dal";

export const getUsers = (_: Request, res: Response) => {
  res.end(JSON.stringify(Users.getUsers()));
};

export const getUser = (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const user = Users.getUserByUsername(username);
    res.end(JSON.stringify(user));
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};

export const postUser = (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const user = Users.postNewUser(username);
    res.end(JSON.stringify(user));
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};

export const putUser = (req: Request, res: Response) => {
  const username = req.params.username;
  const user = req.body;
  try {
    Users.putUser(username, user);
    res.end();
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    Users.deleteUser(username);
    res.end();
  } catch (e) {
    let message = "";
    if (e instanceof Error) message = e.message;

    res.status(400);
    res.end(message);
  }
};
