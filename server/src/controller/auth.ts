import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UAParser } from "ua-parser-js";

export function signIn(req: Request, res: Response) {
  console.log("----------------");
  console.log(req.ip);
  console.log(req.headers["user-agent"]);
  console.log(UAParser(req.headers["user-agent"]));
  console.log("----------------");
  return res.status(StatusCodes.OK).json({
    ip: req.ip,
    uaParser: UAParser(req.headers["user-agent"]),
  });
}
