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
import Image from "next/image"

export const RosterSidebar = () => {
  const { rosters, isLoading } = useRosterStore()

  if (!rosters || (!isLoading && rosters?.length === 0)) {
    return (
      <div className="w-[18%] bg-[#191919] pt-[95px] px-[18px] h-full space-y-4 max-h-[1750px] min-h-[1750px] overflow-scroll">
        <div className="flex flex-col items-center justify-center mt-[300px]  z-1000 space-y-3">
          <Image
            src="/images/empty_esport_icon.svg"
            width={60}
            height={60}
            alt=""
          />
          <p className="text-[#c4c4c4] text-center font-semibold text-sm">
            저장된 로스터가 <br />
            없습니다.
          </p>
        </div>
      </div>
    )
  }

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
