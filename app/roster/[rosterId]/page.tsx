"use client"

import { roster } from "@/actions/roster"
import { type CarouselApi } from "@/components/ui/carousel"
import { RosterTypes } from "@/hooks/useRosterStore"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { ProfileCarousel } from "./_components/profile-carousel"
import { AwardsChart } from "./_components/awards-chart"

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
    <div className="w-full h-full pt-24 flex flex-col p-[48px] space-y-4">
      <h3 className="text-4xl text-[#eeeeee] font-bold">{item?.title}</h3>
      <div className="w-full h-full flex px-[48px] py-[24px] bg-[#1a1a1a] space-x-8">
        <ProfileCarousel setApi={setApi} players={item?.players} />
        <AwardsChart players={item?.players} current={current} />
      </div>
    </div>
  )
}

export default RosterIdPage
