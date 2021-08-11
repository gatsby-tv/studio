import { Fetcher } from '@gatsby-tv/utilities';

export const fetcher = Fetcher(
  process.env.WESTEGG_URL,
  process.env.WESTEGG_VERSION
);
