import { NextFunction, Request, Response } from "express";
import { AuthFailureError, BadTokenError } from "../core/ApiError";
import jwt from "jsonwebtoken";
import { secretToken } from "../config";

export interface ReqUser {
  email: string;
  id: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new AuthFailureError();

  if (!authorization.includes("Bearer")) throw new AuthFailureError();

  const token = authorization.split(" ")[1];

  const isValid = jwt.verify(token, secretToken);

  if (!isValid) throw new BadTokenError();

  const payload = jwt.decode(token) as ReqUser;
  res.locals.user = { email: payload.email, id: payload.id };
  return next();
};
