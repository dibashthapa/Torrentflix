import express from "express";
import { SuccessResponse } from "../../core/ApiResponse";
import prismaClient from "../../database/prisma";
import asyncHandler from "../../utils/asyncHandler";
import validator from "../../utils/validator";
import { BadRequestError } from "../../core/ApiError";
import schema from "./schema";
import { createHash } from "../../utils/hash";

const router = express.Router();
router.post(
  "/basic",
  validator(schema.signup),
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const user = await prismaClient.user.findFirst(email);
    if (user) throw new BadRequestError("User with this email already exists");
    const hashedPassword = await createHash(password);

    const newUser = await prismaClient.user.create({
      data: { email, password: hashedPassword, name },
    });
    const { password: _, ...restUser } = newUser;

    new SuccessResponse("Sign Up Success", { user: restUser }).send(res);
  })
);

export default router;
