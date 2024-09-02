import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function currentUser(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    id: "123123",
  });
}
