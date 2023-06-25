import { Request, Response } from "express";
import { SQUARES } from "../models";

export const getSquares = (req: Request, res: Response) => {
  res.end(JSON.stringify(SQUARES));
};
