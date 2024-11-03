'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NhostProvider } from '@nhost/react';
import { nhost } from '../lib/nhostClient';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NhostProvider nhost={nhost}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NhostProvider>
  );
}
