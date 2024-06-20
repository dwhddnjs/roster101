"use client"

import { roster } from "@/actions/roster"
import { type CarouselApi } from "@/components/ui/carousel"
import { RosterTypes } from "@/hooks/useRosterStore"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { ProfileCarousel } from "./_components/profile-carousel"
import { AwardsChart } from "./_components/awards-chart"
import { PlayerTable } from "./_components/player-table"
import { MemoBox } from "./_components/memo-box"
import { FadeLoader } from "react-spinners"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"

function RosterIdPage() {
  const { rosterId } = useParams()
  const [item, setItem] = useState<null | RosterTypes>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await roster(rosterId as string)
        setItem(res as RosterTypes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [rosterId])

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (!item) {
    return (
      <div className="w-full h-full pt-48 flex flex-col items-center">
        <FadeLoader color="#555555" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full h-fit flex flex-col p-[48px]  space-y-4",
        isMobile && "text-xl px-0"
      )}
    >
      <h3
        className={cn(
          "text-4xl text-[#eeeeee] font-bold mt-[50px]",
          isMobile && "text-xl pl-[18px] mt-[10px]"
        )}
      >
        {item?.title}
      </h3>
      <div
        className={cn(
          "w-full h-full flex flex-col px-[48px] py-[24px] bg-[#1a1a1a] space-y-8",
          isMobile && "px-[18px] space-y-4"
        )}
      >
        <div
          className={cn(
            "flex space-x-8 w-full",
            isMobile && "flex-col space-x-0 space-y-4"
          )}
        >
          <ProfileCarousel setApi={setApi} players={item?.players} />
          <AwardsChart players={item?.players} current={current} />
        </div>
        <div
          className={cn(
            "flex space-x-8 w-full h-full",
            isMobile && "flex-col space-x-0 space-y-4"
          )}
        >
          <PlayerTable players={item?.players} />
          <MemoBox />
        </div>
      </div>
    </div>
  )
}

export default RosterIdPage
