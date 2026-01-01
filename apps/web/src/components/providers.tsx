"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "jotai"

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  )
}
