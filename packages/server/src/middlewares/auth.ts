import express, { NextFunction, Request, Response } from "express";
import { AuthFailureError, BadTokenError } from "../core/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { secretToken } from "../config";
import { ProtectedRequest } from "../routes/media/video";

const router = express.Router();

export default (req: ProtectedRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new AuthFailureError();

  if (!authorization.includes("Bearer")) throw new AuthFailureError();

  const token = authorization.split(" ")[1];

  const isValid = jwt.verify(token, secretToken);

  if (!isValid) throw new BadTokenError();

  const payload = jwt.decode(token) as ProtectedRequest["user"];
  req.user = { email: payload.email, id: payload.id };
  return next();
};
