import { Router } from "express";

import healthcheck from "./healthcheck";
import webhook from "./webhook";

const router = Router();

router
  .use("/webhook", webhook)
  .use("/_healthcheck", healthcheck);

export default router;
