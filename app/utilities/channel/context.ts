import { createContext, Dispatch, SetStateAction } from 'react';
import { Channel } from '@gatsby-tv/types';

export type ChannelContextType = [
  Channel | undefined,
  Dispatch<SetStateAction<Channel | undefined>>,
];

export const ChannelContext = createContext<ChannelContextType | undefined>(
  undefined
);
