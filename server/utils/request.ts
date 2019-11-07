import axios from "axios";

interface IRequest {
  fetchData(url: string, config?: object): Promise<{}>;
}

class Request implements IRequest {
  private vendor: any;

  constructor(vendor: {}) {
    this.vendor = vendor;
  }

  public async fetchData(url: string, config?: object): Promise<{}> {
    try {
      const { data } = await this.vendor.get(url, config);

      return Promise.resolve({ data });
    } catch (e) {
      console.log("Could not fetchData", e);
      return e;
    }
  }
}

export const request = new Request(axios);
