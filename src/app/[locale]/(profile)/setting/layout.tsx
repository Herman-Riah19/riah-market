"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const LayoutSetting = ({ children }: React.PropsWithChildren) => {
  return (
    <section>
        <SessionProvider>
            {children}
        </SessionProvider>
    </section>
  )
}

export default LayoutSetting