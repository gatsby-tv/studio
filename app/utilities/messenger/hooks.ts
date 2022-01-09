import { useContext, useMemo } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { ClientMessenger } from './messenger';
import { MessengerContext, MessengerContextType } from './context';

export function useMessengerContext(): MessengerContextType {
  const current = useContext(MessengerContext);

  if (current) {
    throw new Error('Messenger context is not unique.');
  }

  return useMemo(() => new ClientMessenger(), []);
}

export function useMessenger(): MessengerContextType {
  const context = useContext(MessengerContext);

  if (!context) {
    throw new ContextError('Messenger');
  }

  return context;
}
