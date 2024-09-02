import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import configs from "./configs";
import cors from "cors";
import compression from "compression";
import { Customerror, IErrorResponse, NotFoundError } from "./error-handler";
import { StatusCodes } from "http-status-codes";
import { appRoutes } from "./routes";

const app = express();
const SERVER_PORT = 4000;

app.set("trust proxy", 1);
app.use(morgan(configs.NODE_ENV == "production" ? "combined" : "dev"));
app.use(helmet());
app.use(
  cors({
    origin: configs.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(compression());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

appRoutes(app);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(
  (error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Customerror) {
      if (error.statusCode == StatusCodes.UNAUTHORIZED) {
        // res.clearCookie("session");
      }
      return res.status(error.statusCode).json(error.serializeErrors());
    }
    console.log(error);
    // req.session.destroy(function (err) {});
    // res.clearCookie("session");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
);

app.listen(SERVER_PORT, () => {
  console.log(`App server has started with process id ${process.pid}`);
  console.log(`App server running on port ${SERVER_PORT}`);
});
