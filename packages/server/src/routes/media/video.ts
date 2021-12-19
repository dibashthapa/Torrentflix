import express, { Request, Response } from "express";
import prismaClient from "../../database/prisma";
import { BadRequestError, NoDataError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import auth, { ReqUser } from "../../middlewares/auth";
import asyncHandler from "../../utils/asyncHandler";
import { fetchPage, scrape } from "../../utils/1377x";
import { randomUUID } from "crypto";
import { torrentQueue } from "../../queues/torrentQueue";
import { config } from "../../config";
import { join } from "path";

const router = express.Router();
router.use("/", auth);
router.get(
  "/all",
  asyncHandler(async (req: Request, res: Response) => {
    const videos = await prismaClient.video.findMany({});
    if (videos.length === 0) throw new NoDataError();
    return new SuccessResponse("Success", videos).send(res);
  })
);

router.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const { link } = req.body;
    const user = res.locals.user as ReqUser;

    const response = await fetchPage(link);
    const fileInfo = scrape(response);
    if (!fileInfo) throw new NoDataError();
    const videoExists = await prismaClient.video.findFirst({
      where: { userId: user.id, magnetLink: fileInfo.magnetLink },
    });

    if (videoExists)
      throw new BadRequestError("Video with this link already exists");
    const hash = randomUUID();
    const re = /dn=(?<link>.+?)\&/;
    const match = fileInfo.magnetLink?.match(re);
    const fileName = decodeURI(match?.groups?.link as string);
    const newJob = await torrentQueue.add({
      userId: String(user.id),
      hashedValue: hash,
      fileName,
      magnetLink: fileInfo.magnetLink as string,
    });
    const filePath = join(config.rootVideoPath, "encodedVideos", hash);
    const createdVideo = await prismaClient.video.create({
      data: {
        magnetLink: fileInfo.magnetLink,
        userId: user.id,
        hash,
        thumbnail: fileInfo.thumbnail,
        tags: fileInfo.tags,
        filename: fileName,
        path: filePath,
        jobId: String(newJob.id),
      },
    });
    return new SuccessResponse("success", createdVideo).send(res);
  })
);

export default router;
