import {getAsyncIterator} from "../utils";

export interface Dataset {
  metadata: {
    date: string
  }
  data: {
    [label: string]: {
      nice: number;
      system: number;
      idle: number;
      iowait: number;
      irq: number;
      softirq: number;
      steal: number;
      guest: number;
      guestNice: number;
      user: number;
    }
  }
}

export default class StatsHTTPClient {
  private static INSTANCE: StatsHTTPClient;

  static getInstance(baseURL?: string) {
    if (StatsHTTPClient.INSTANCE) {
      return StatsHTTPClient.INSTANCE
    }
    return new StatsHTTPClient(baseURL)
  }

  private readonly baseURL: string;

  private constructor(baseURL: string = `${process.env.API_URL}/stats`) {
    this.baseURL = baseURL;
  }

  async* fetch() {
    const textDecoder = new TextDecoder();
    const {body} = await fetch(`${process.env.API_URL}/stats`);

    if (body) {
      const chunks = getAsyncIterator(body);

      // @ts-nocheck
      for await (const chunk of chunks) {

        const string = textDecoder.decode(chunk);

        try {
          yield JSON.parse(string) as Dataset;
        } catch (e) {
          yield e;
        }
      }
    }
  }
}
