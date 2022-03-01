import dotenv from "dotenv";
import fs from "fs";
import Logger from "./core/Logger";
dotenv.config();
export const config = {
  rootVideoPath: process.env.ROOT_VIDEO_PATH as string,
  redisHost: process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  corsOrigin: process.env.CORS_ORIGIN,
  jwtExpiry: process.env.JWT_EXPIRY,
  secretToken: process.env.SECRET_TOKEN as string,
};
type Key = keyof typeof config;
export const setupConfig = () => {
  Logger.info("Setting up config");
  for (const key in config) {
    const configValue = config[key as Key];
    if (!configValue) {
      throw new Error(`${key} is undefined`);
    }
  }

  if (config.rootVideoPath) {
    const pathExists = fs.existsSync(config.rootVideoPath);
    if (!pathExists) {
      throw new Error(`${config.rootVideoPath} path doesn't exist`);
    }
  }
};

export const logDirectory = process.env.LOG_DIR;

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const jwtExpiry = process.env.JWT_EXPIRY;

export const secretToken = process.env.SECRET_TOKEN as string;
