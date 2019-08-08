import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({
    text: "Hello",
    uptime: process.uptime(),
  });
});

export default router;
