import * as express from "express";
import * as morgan from "morgan";
import { createConnection } from "typeorm";
import { errRes } from "../helpers/tools";
const app = express();
const port = process.env.PORT || 3001;
import v1 from "../route/app/v1";
import * as uploadImg from "express-fileupload";

createConnection().then(async (connection) => {
  app.use(uploadImg({}));
  //  Middleware to get the json from the request
  app.use(express.json());
  //log middleware
  app.use(morgan("dev"));
  // my route handler
  app.use("/v1", v1);
  //404
  app.use((req, res, next) => {
    return errRes(res, "404 Not found", "404", 404);
  });
  //listener
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
