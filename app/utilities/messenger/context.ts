import { createContext } from 'react';

import { ClientMessenger } from './messenger';

export type MessengerContextType = ClientMessenger;

export const MessengerContext =
  createContext<MessengerContextType | undefined>(undefined);
