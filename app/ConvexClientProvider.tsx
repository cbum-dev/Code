'use client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React from 'react'

function ConvexClientProvider({children}:{children: React.ReactNode}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || 'https://your-convex-url.convex.dev')
  return (
    <ConvexProvider client={convex}>
        {children}
    </ConvexProvider>
  )
}

export default ConvexClientProvider