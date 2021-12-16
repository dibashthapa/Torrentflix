import "reflect-metadata";
import express from "express";
import cors from "cors";
import videoRoutes from "./routes/video";
import { config } from "./config";
const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.static(__dirname));
app.use(express.json());

app.use("/video", videoRoutes);
export default app;
