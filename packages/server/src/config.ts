import dotenv from "dotenv";
dotenv.config();
export const config = {
  environment: process.env.ENVIRONMENT,
  rootVideoPath: process.env.ROOT_VIDEO_PATH as string,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUsername: process.env.DB_USERNAME,
  redisHost: process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  corsOrigin: process.env.CORS_ORIGIN,
};
