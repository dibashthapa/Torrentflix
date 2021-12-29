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
import { createReadStream, statSync } from "fs";

const router = express.Router();
router.get(
  "/all",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    const videos = await prismaClient.video.findMany({});
    if (videos.length === 0) throw new NoDataError();
    return new SuccessResponse("Success", videos).send(res);
  })
);

router.get(
  "/:hash",
  asyncHandler(async (req: Request, res: Response) => {
    const hash = req.params.hash;
    const video = await prismaClient.video.findFirst({ where: { hash } });
    if (!video) throw new NoDataError();
    new SuccessResponse("success", video).send(res);
  })
);

router.get(
  "/:hash/play",
  asyncHandler(async (req: Request, res: Response) => {
    const hash = req.params.hash;
    const video = await prismaClient.video.findFirst({ where: { hash } });
    if (!video) throw new NoDataError();
    const vidPath = join(video.path, video.filename);
    const stat = statSync(vidPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = createReadStream(vidPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Type": "video/mp4",
        "Content-Length": fileSize,
      };
      res.writeHead(200, head);
      createReadStream(vidPath).pipe(res);
    }
  })
);
router.post(
  "/create",
  auth,
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
    const filePath = join(config.rootVideoPath, "encodedVideos", fileName);
    const createdVideo = await prismaClient.video.create({
      data: {
        magnetLink: fileInfo.magnetLink,
        userId: user.id,
        size: fileInfo.totalSize,
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
