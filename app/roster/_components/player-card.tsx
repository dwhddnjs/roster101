"use client"

import React, { SetStateAction } from "react"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Medal, Trophy } from "lucide-react"
import { PlayerTypes } from "../../../types/player-types"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts"

interface PlayerCardProps {
  player: PlayerTypes
  setSearchValue: React.Dispatch<SetStateAction<string>>
  onSelectPosition: (position: string) => void
}

export const PlayerCard = ({
  player,
  setSearchValue,
  onSelectPosition,
}: PlayerCardProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { onSelectPlayer, roster } = useRosterBoxStore()

  if (!player) {
    return null
  }

  const selectedPlayer = roster.filter(
    (item) => item.position === player.position
  )[0]

  const onSelectPlayerWithResetSearch = () => {
    onSelectPlayer(player)
    onSelectPosition(player.position)
    setSearchValue("")
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          onClick={onSelectPlayerWithResetSearch}
          className={cn(
            "bg-[#272727] rounded-lg  border-[2px] border-[#191919] hover:translate-y-2  duration-200 ease-linear shadow-md relative",
            selectedPlayer?.nickname === player?.nickname &&
              "border-[#eeeeee] border-[2px]"
          )}
        >
          <div className="flex items-end justify-center">
            <Image src={player.img} width={130} height={130} alt="" />
          </div>
          <div
            className={cn(
              "px-3 py-2 flex justify-between items-end ",
              isMobile && "px-2 py-1.5"
            )}
          >
            <div>
              <h2
                className={cn(
                  "text-[#eeeeee] font-bold text-md",
                  isMobile && "text-sm"
                )}
              >
                {player.nickname}
              </h2>
              <p
                className={cn(
                  "text-[#c4c4c4] text-xs",
                  isMobile && "text-[10px]"
                )}
              >
                {player.name}
              </p>
            </div>
          </div>
          <div className="absolute bottom-1.5 right-1.5">
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
          <Trophy color="#fff" width={14} height={14} />
          <h3 className="font-semibold text-white text-sm">주요 경력</h3>
        </div>
        <div className="space-y-0.5 ml-[4px]">
          {player?.career?.length === 0 ? (
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
