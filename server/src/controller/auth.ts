import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UAParser } from "ua-parser-js";

export function signIn(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({
    ip: req.ip,
    uaParser: UAParser(req.headers["user-agent"]),
  });
}
