import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import validator from "../../utils/validator";
import schema from "./schema";
import prismaClient from "../../database/prisma";
import { AuthFailureError, BadRequestError } from "../../core/ApiError";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/jwt";
import { SuccessResponse } from "../../core/ApiResponse";
const router = express.Router();
router.post("/basic", validator(schema.userCredential), asyncHandler(async (req, res) => {
    const user = await prismaClient.user.findFirst(req.body.email);
    if (!user)
        throw new BadRequestError("User doesn't exist");
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
        throw new AuthFailureError("Authentication Failure");
    const { password: _, id: __, ...rest } = user;
    const accessToken = await createToken({
        email: rest.email,
        userId: user.id,
    });
    new SuccessResponse("Login Success", { user: rest, accessToken }).send(res);
}));
export default router;
//# sourceMappingURL=login.js.map