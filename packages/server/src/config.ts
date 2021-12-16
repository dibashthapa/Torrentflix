import dotenv from "dotenv";
dotenv.config();
export const config = {
  rootVideoPath: process.env.ROOT_VIDEO_PATH as string,
  redisHost: process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  corsOrigin: process.env.CORS_ORIGIN,
};

export const logDirectory = process.env.LOG_DIR;

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const jwtExpiry = process.env.JWT_EXPIRY;

export const secretToken = process.env.SECRET_TOKEN as string;
