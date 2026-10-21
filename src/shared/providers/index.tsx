import React from 'react';
import QueryProvider from './query-provider';

function Provider({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default Provider;
