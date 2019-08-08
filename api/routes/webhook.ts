import { Router } from "express";
import services from "../services";

const { handleEvent } = services;
const router = Router();

router.post("/", (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(() => res.status(200))
    .catch((e) => {
      console.error(e);
    });

  return res.json({status: "ok"});
});

export default router;
