import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import { config } from "./config";
import { ApiError } from "./core/ApiError";
import { BadRequestResponse } from "./core/ApiResponse";
const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.static(__dirname));
app.use(express.json());

app.use("/", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    new BadRequestResponse(err.message).send(res);
  }
});

export default app;
