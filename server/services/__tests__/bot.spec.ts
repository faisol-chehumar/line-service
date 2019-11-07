import * as line from "@line/bot-sdk";
import { LineBot } from "../bot";

class Client {
  public constructor() {
    return;
  }

  public replyMessage() {
    return {
      "x-signature": "12124324",
    };
  }
}

const mockConfig = {};
const mockVendor = {
  Client,
};

const bot = new LineBot(mockVendor, mockConfig);

describe("Bot Services", () => {
  describe("handleEvent()", () => {
    it("should return {status: 'noResponseEvent'} if it is not messages event.", async () => {
      const lineEvent: line.MessageEvent = {
        message: {
          id: "123",
          packageId: "12",
          stickerId: "123",
          type: "sticker",
        },
        replyToken: "121241",
        source: {
          type: "user",
          userId: "12144",
        },
        timestamp: 1567076188,
        type: "message",
      };

      const result = await bot.handleEvent(lineEvent);

      expect(result).toEqual({ status: "noResponseEvent" });
    });

    it("should return {status: '12124324'} if its messages event.", async () => {
      const lineEvent: line.MessageEvent = {
        message: {
          id: "1",
          text: "วาร์ป",
          type: "text",
        },
        replyToken: "121241",
        source: {
          type: "user",
          userId: "12144",
        },
        timestamp: 1567076188,
        type: "message",
      };

      const result = await bot.handleEvent(lineEvent);

      expect(result).toEqual({ status: "successReply" });
    });
  });
});
