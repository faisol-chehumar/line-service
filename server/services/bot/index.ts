import * as line from "@line/bot-sdk";
import * as lineConfig from "../../../line.config.json";

interface IReply {
  replyToken: string;
  replyType: string;
  replyData: Array<{}>;
}

interface IResponseEvent {
  status: string;
  data?: {};
}

export class LineBot {
  private client: any;

  constructor(vendor: any, config: any) {
    this.client = new vendor.Client(config);
  }

  public handleEvent = async (event: line.MessageEvent): Promise<IResponseEvent> => {
    const NO_RESPONSE_EVENT = "no response";

    return new Promise(async (resolve) => {
      // const { replyToken, type, message } = event;

      if (this.isMessageEvent(event)) {
        const text = this.getTextFromEvent(event);
        const service = this.getServiceRequest(text);
        const data = this.getDataFromService(service);

        const result = this.reply(data);

        return resolve({ status: result.status });
        // const response = messageHandlers.getResponseData(message.text);

        // const result = await this.messageEventHandlers(replyToken, message.text);

        // resolve({ status: result.status });
      }

      resolve({ status: NO_RESPONSE_EVENT });
    });
  }

  private getServiceRequest = (text: string): string => {
    if (text.includes("รายการหนังล่าสุด")) {
      return "GET_MOVIE_LIST";
    }

    return "NO_RESPONSE";
  }

  private getDataFromService = (service: string): Array<{}> => {
    if (service === "GET_MOVIE_LIST") {
      return [{
        rating: 5,
        title: "GET OUT",
      }];
    }

    return [];
  }

  private isMessageEvent = (event: line.MessageEvent) => {
    return event.type === "message" && event.message.type === "text";
  }

  private getTextFromEvent = (event: line.MessageEvent) => {
    return event.type === "message" && event.message.type === "text"
      ? event.message.text
      : "";
  }

  private messageEventHandlers = async (replyToken: string, text: string): Promise<IResponseEvent> => {
    const NO_REPLY = "noReply";
    const SUCCESS_REPLY = "successReply";

    if (text.includes("วาร์ป")) {
      const replyData = [{ text: "hello" }];

      const result = await this.reply({
        replyData,
        replyToken,
        replyType: "text",
      });

      return {
        data: result,
        status: SUCCESS_REPLY,
      };
    }

    return { status: NO_REPLY };
  }

  private reply = (data: IReply) => {
    const { replyType, replyData, replyToken } = data;

    try {
      if (replyType === "text") {
        return this.client.replyMessage(replyToken, {
          text: replyData,
          type: "text",
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const lineBotInstance = new LineBot(line, lineConfig);
