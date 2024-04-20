"use client"

import { roster } from "@/actions/roster"
import { type CarouselApi } from "@/components/ui/carousel"
import { RosterTypes } from "@/hooks/useRosterStore"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { ProfileCarousel } from "./_components/profile-carousel"
import { AwardsChart } from "./_components/awards-chart"
import { PlayerTable } from "./_components/player-table"

import { Player } from ".prisma/client"
import { MemoBox } from "./_components/memo-box"

function RosterIdPage() {
  const { rosterId } = useParams()
  const [item, setItem] = useState<null | RosterTypes>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const [count, setCount] = useState(0)

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

  return (
    <div className="w-full h-fit pt-24 flex flex-col p-[48px] space-y-4 ">
      <h3 className="text-4xl text-[#eeeeee] font-bold">{item?.title}</h3>
      <div className="w-full h-full flex flex-col px-[48px] py-[24px] bg-[#1a1a1a] space-y-8">
        <div className="flex space-x-8">
          <ProfileCarousel setApi={setApi} players={item?.players} />
          <AwardsChart players={item?.players} current={current} />
        </div>
        <div className="flex space-x-8 w-full h-full">
          <MemoBox />
          <PlayerTable players={item?.players} />
        </div>
      </div>
    </div>
  )
}

export default RosterIdPage
