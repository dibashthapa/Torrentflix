import express from "express";
import prismaClient from "../../database/prisma";
import { BadRequestError, NoDataError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import auth from "../../middlewares/auth";
import asyncHandler from "../../utils/asyncHandler";
import { fetchPage, scrape } from "../../utils/1377x";
import { randomUUID } from "crypto";
import { torrentQueue } from "../../queues/torrentQueue";
import { config } from "../../config";
import { join } from "path";
const router = express.Router();
router.get("/all", auth, asyncHandler(async (req, res) => {
    const videos = await prismaClient.video.findMany({});
    if (videos.length === 0)
        throw new NoDataError();
    return new SuccessResponse("Success", videos).send(res);
}));
router.post("/create", auth, asyncHandler(async (req, res) => {
    const { link } = req.body;
    const response = await fetchPage(link);
    const fileInfo = scrape(response);
    if (!fileInfo)
        throw new NoDataError();
    const videoExists = await prismaClient.video.findFirst({
        where: { userId: req.user.id, magnetLink: fileInfo.magnetLink },
    });
    if (videoExists)
        throw new BadRequestError("Video with this link already exists");
    const hash = randomUUID();
    const re = /dn=(?<link>.+?)\&/;
    const match = fileInfo.magnetLink?.match(re);
    const fileName = decodeURI(match?.groups?.link);
    const newJob = await torrentQueue.add({
        userId: String(req.user.id),
        hashedValue: hash,
        fileName,
        magnetLink: fileInfo.magnetLink,
    });
    const filePath = join(config.rootVideoPath, "encodedVideos", hash);
    const createdVideo = await prismaClient.video.create({
        data: {
            magnetLink: fileInfo.magnetLink,
            userId: req.user.id,
            hash,
            thumbnail: fileInfo.thumbnail,
            tags: fileInfo.tags,
            filename: fileName,
            path: filePath,
            jobId: String(newJob.id),
        },
    });
    return new SuccessResponse("success", createdVideo).send(res);
}));
export default router;
//# sourceMappingURL=video.js.map