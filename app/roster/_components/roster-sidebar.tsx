import {
  FadeLoader,
  PacmanLoader,
  BeatLoader,
  ClipLoader,
} from "react-spinners"
import React, { useEffect } from "react"
import { RosterCard } from "./roster-card"
import { Roster } from "@prisma/client"
import { useRosterStore } from "@/hooks/useRosterStore"

export const RosterSidebar = () => {
  const { rosters, isLoading } = useRosterStore()

  return (
    <div className="w-[18%] bg-[#191919] pt-[95px] px-[18px] h-full space-y-4 max-h-[1750px] min-h-[1750px] overflow-scroll">
      {isLoading && (
        <div className="flex items-center justify-center mt-[300px]">
          <FadeLoader color="#555555" />
        </div>
      )}
      {rosters?.map((roster) => (
        <RosterCard key={roster.id} roster={roster} />
      ))}
    </div>
  )
}
