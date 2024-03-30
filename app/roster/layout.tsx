import { RosterProvider } from "@/providers/roster-provider"
import React from "react"

function RosterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RosterProvider>{children}</RosterProvider>
    </>
  )
}

export default RosterLayout
