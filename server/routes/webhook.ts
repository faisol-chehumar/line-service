import { Router } from "express";
import services from "../services";

const { lineBotInstance } = services;

const router = Router();

router.get("/", (_, res) => {
  return res.status(200).json({status: "ok"});
});

router.post("/", (req, res) => {
  Promise
    .all(req.body.events.map(lineBotInstance.handleEvent))
    .then(() => res.status(200))
    .catch((e) => {
      console.error(e);
    });

  return res.json({status: "ok"});
});

export default router;
