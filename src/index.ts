import * as express from "express";
import { createConnection } from "typeorm";
const app = express();
const port = 3001;
import v1 from "../route/app/v1";

createConnection().then(async (connection) => {
  //  Middleware to get the json from the request
  app.use(express.json());
  // my route handler
  app.use("/v1", v1);
  //listener
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});