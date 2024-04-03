"use client"

import React from "react"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Medal } from "lucide-react"
import { PlayerTypes } from "../../../types/player-types"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { cn } from "@/lib/utils"
import { selectedPlayerStyle } from "@/lib/function"

interface PlayerCardProps {
  player: PlayerTypes
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const { onSelectPlayer, roster } = useRosterBoxStore()
  console.log("roster: ", roster)

  if (!player) {
    return null
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          onClick={() => onSelectPlayer(player)}
          className={cn(
            "bg-[#272727] rounded-md border-[1px] border-[#191919] hover:translate-y-2  duration-200 ease-linear shadow-md relative ",
            selectedPlayerStyle(roster, player)
          )}
        >
          <div className="flex items-center justify-center">
            <Image src={player.img} width={120} height={80} alt="" />
          </div>
          <div className="p-3 flex justify-between items-end ">
            <div>
              <h2 className="text-[#eeeeee] font-bold text-md">
                {player.nickname}
              </h2>
              <p className="text-[#c4c4c4] text-xs">{player.name}</p>
            </div>
          </div>
          <div className="absolute bottom-2 right-2">
            <Image
              src={`/images/${player.position}_icon_p.svg`}
              width={18}
              height={18}
              alt=""
            />
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-[#1a1a1a] border-0 relative drop-shadow-none">
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[12px] border-b-[#1a1a1a] border-r-[8px] border-r-transparent absolute top-[-12px] left-[45%]"></div>
        <div className="flex justify-center items-center w-fit space-x-1 mb-2">
          <Medal color="#fff" width={14} height={14} />
          <h3 className="font-semibold text-white text-sm">주요 경력</h3>
        </div>
        <div className="space-y-0.5 ml-[4px]">
          {player?.career.length === 0 ? (
            <p className="text-[#c4c4c4] text-xs">없음</p>
          ) : (
            player?.career?.map((career) => (
              <p className="text-[#c4c4c4] text-xs" key={career}>
                {`●  ${career}`}
              </p>
            ))
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
