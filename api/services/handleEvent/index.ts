import * as line from "@line/bot-sdk";
import * as lineConfig from "../../../line.config.json";

const client = new line.Client(lineConfig);

function handleEvent(event: line.MessageEvent) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve("ok");
  }

  const triggerMsg = event.message.text;
  if (triggerMsg === "วาร์ป") {
    return _messageHandler({
      replyToken: event.replyToken,
      text: event.message.text,
    });
  }

  return Promise.resolve("ok");
}

interface IMessage {
  text: string;
  replyToken: string;
}

function _messageHandler(message: IMessage) {
  return client.replyMessage(message.replyToken, {
    text: message.text,
    type: "text",
  });
}

export default handleEvent;
