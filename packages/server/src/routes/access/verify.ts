import express, { Request, Response } from "express";
import { SuccessResponse } from "../../core/ApiResponse";
import auth from "../../middlewares/auth";
import asyncHandler from "../../utils/asyncHandler";

const router = express.Router();

router.post(
  "/",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    return new SuccessResponse("Success", "Verified").send(res);
  })
);

export default router;
