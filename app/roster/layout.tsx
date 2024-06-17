import { PlayerListProvider } from "@/providers/player-list-provider"
import { RosterProvider } from "@/providers/roster-provider"
import React from "react"

function RosterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlayerListProvider>
        <RosterProvider>{children}</RosterProvider>
      </PlayerListProvider>
    </>
  )
}

export default RosterLayout
