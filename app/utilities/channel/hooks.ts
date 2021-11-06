import { useState, useContext } from 'react';
import { ChannelContext, ChannelContextType } from './context';
import { ContextError } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

export function useChannelContext(): ChannelContextType {
  return useState<Channel | undefined>(undefined);
}

export function useChannel(): ChannelContextType {
  const context = useContext(ChannelContext);

  if (!context) {
    throw new ContextError('Channel');
  }

  return context;
}
