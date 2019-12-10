import {ContentfulClientApi, createClient} from 'contentful'

export default class ContentfulHTTPClient {
  private static INSTANCE: ContentfulClientApi;

  static getInstance(space: string = `${process.env.CONTENTFUL_SPACE}`, accessToken: string = `${process.env.CONTENTFUL_ACCESS_TOKEN}`) {
    if (!ContentfulHTTPClient.INSTANCE) {
      ContentfulHTTPClient.INSTANCE = createClient({space, accessToken})
    }
    return ContentfulHTTPClient.INSTANCE
  }
}
