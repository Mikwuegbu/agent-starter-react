'use client';

import { ReactNode } from 'react';
import { ConversationProvider as Provider } from './ConversationContext';

export function ConversationProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
