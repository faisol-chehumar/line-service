import * as line from "@line/bot-sdk";
import * as lineConfig from "../line.config.json";

import express from "express";

const app = express();
const client = new line.Client(lineConfig);

app.post("/webhook", line.middleware(lineConfig), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(() => res.status(200));
});

app.use("/_healthcheck", (_, res) => {
  res.status(200).json({
    text: "Hello",
    uptime: process.uptime(),
  });
});

function handleEvent(event: line.MessageEvent) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return messageHandler({
    replyToken: event.replyToken,
    text: event.message.text,
  });
}

interface IMessage {
  text: string;
  replyToken: string;
}

function messageHandler(message: IMessage) {
  return client.replyMessage(message.replyToken, {
    text: message.text,
    type: "text",
  });
}

app.listen(3000, () => { console.log("Running at localhost:3000"); });
