import { Request, Response } from "express";
import { TILES } from "../models";

export const getTiles = (req: Request, res: Response) => {
  res.end(JSON.stringify(TILES));
};
