import * as line from "@line/bot-sdk";
import bodyParser from "body-parser";
import { Router } from "express";

import * as lineConfig from "../../../line.config.json";

const middlewares = Router();

middlewares
  .use(bodyParser.json())
  .use((req, _, next) => {
    if (req.path === "/webhook") {
      line.middleware(lineConfig);
    }

    next();
  });

export default middlewares;
