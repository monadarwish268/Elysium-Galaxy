'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return createElement(QueryClientProvider, { client: queryClient }, children);
}