import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ConnectionOptions, createConnection } from "typeorm";
import videoRoutes from "./routes/video";
import { config } from "./config";
import { Video } from "./entity/Video";
import { User } from "./entity/User";
const app = express();

const options: ConnectionOptions = {
  host: config.dbHost,
  port: Number(config.dbPort),
  database: config.dbName,
  type: "postgres",
  username: config.dbUsername,
  password: config.dbPassword,
  synchronize: true,
  entities: [Video, User],
  name: "default",
};

async function init() {
  createConnection({ ...options })
    .then(async (_) => {
      console.log("Connected to db");
    })
    .catch((err) => console.log("Connection Error", err));
}
init();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.static(__dirname));
app.use(express.json());

app.use("/video", videoRoutes);
export default app;
