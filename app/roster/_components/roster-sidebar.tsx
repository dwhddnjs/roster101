import React, { useEffect } from "react"
import { RosterCard } from "./roster-card"
import { useRosterStore } from "@/hooks/useRosterStore"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { useMediaQuery } from "usehooks-ts"

export const RosterSidebar = () => {
  const { rosters, isLoading } = useRosterStore()
  const { rosterId } = useRosterBoxStore()
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (!rosters || (!isLoading && rosters?.length === 0)) {
    return (
      <div className="w-[18%]  bg-[#191919] pt-[95px] px-[18px] min-h-full space-y-4 overflow-y-scroll ">
        <div className="flex flex-col items-center justify-center mt-[300px] z-1000 space-y-3">
          <Image
            src="/images/empty_esport_icon.svg"
            width={60}
            height={60}
            alt="roster101 esport_empty_icon"
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
    <div className="w-[18%] min-w-[300px] bg-[#191919] pt-[90px] px-[18px] min-h-full space-y-4 overflow-y-auto">
      <div className="w-full flex justify-end ">
        <Button size={"sm"} className="rounded-xl bg-transparent ">
          {rosterId && (
            <Link className="text-xs" href={`/roster/${rosterId}`}>
              OPEN
            </Link>
          )}
        </Button>
      </div>
      {!isMobile && isLoading && (
        <div className="flex flex-col items-center justify-center mt-[300px] space-y-4">
          <RosterCard.Skeleton />
          <RosterCard.Skeleton />
        </div>
      )}
      {rosters.map((roster) => (
        <RosterCard key={roster.id} roster={roster} />
      ))}
    </div>
  )
}
