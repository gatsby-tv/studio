import { Fetcher } from '@gatsby-tv/utilities';

export const fetcher =
  process.env.NODE_ENV !== 'development'
    ? Fetcher(process.env.WESTEGG_URL, process.env.WESTEGG_VERSION)
    : (endpoint: string) => {
        const url = new URL(
          '/dist'.concat(endpoint).concat('.json'),
          'http://localhost:1212'
        );

        return fetch(url.toString());
      };
