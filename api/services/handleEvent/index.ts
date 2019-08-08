import * as line from "@line/bot-sdk";
import * as lineConfig from "../../../line.config.json";

const client = new line.Client(lineConfig);

function handleEvent(event: line.MessageEvent) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return __messageHandler({
    replyToken: event.replyToken,
    text: event.message.text,
  });
}

interface IMessage {
  text: string;
  replyToken: string;
}

function __messageHandler(message: IMessage) {
  return client.replyMessage(message.replyToken, {
    text: message.text,
    type: "text",
  });
}

export default handleEvent;
