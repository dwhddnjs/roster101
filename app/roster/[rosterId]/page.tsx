"use client"

import { roster } from "@/actions/roster"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { RosterTypes } from "@/hooks/useRosterStore"
import Image from "next/image"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

function RosterIdPage() {
  const { rosterId } = useParams()
  const [item, setItem] = useState<null | RosterTypes>(null)

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await roster(rosterId as string)
        console.log("res: ", res)
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
    <div className="w-full h-full pt-24 flex flex-col px-[48px]">
      <h3 className="text-4xl text-[#eeeeee] font-bold">{item?.title}</h3>
      <div className="w-full h-full border-2 flex justify-center">
        <Carousel setApi={setApi} className="h-[500px] w-[500px] border-2 ">
          <CarouselContent>
            {item?.players.map((player) => (
              <CarouselItem key={player.id} className="flex">
                <div>
                  <Image src={player.img} width={300} height={300} alt="" />
                </div>
                <div>
                  <h4>{player.nickname}</h4>
                  <p>{player.name}</p>
                  <p>{player.position}</p>
                </div>
                <div>
                  {player.career.map((career) => (
                    <p key={career}>{career}</p>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default RosterIdPage
