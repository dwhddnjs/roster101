"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import React, { useEffect, useState } from "react"

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryClient] = useState(() => new QueryClient())
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
