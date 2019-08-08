import { Router } from "express";

import healthcheck from "./healthcheck";
import webhook from "./webhook";

const router = Router();

router.use("/_healthcheck", healthcheck);
router.use("/webhook", webhook);

export default router;
