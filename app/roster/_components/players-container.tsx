import React, { useState } from "react"
import { PlayerCard } from "./player-card"
import { PlayerTypes } from "../types/player-types"
import { players } from "@/lib/player"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const PlayersContainer = () => {
  const [position, setPosition] = useState("top")

  const onSelectPosition = (position: string) => {
    setPosition(position)
  }

  return (
    <div className="border-[4px] border-[#1e1e1e] drop-shadow-md">
      <div className=" w-full bg-[#1e1e1e] py-2 px-3">
        <div className="w-fit">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("top")}
          >
            <Image src="/images/top_icon_p.svg" width={26} height={26} alt="" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("jgl")}
          >
            <Image src="/images/jgl_icon_p.svg" width={26} height={26} alt="" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("mid")}
          >
            <Image src="/images/mid_icon_p.svg" width={26} height={26} alt="" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("ad")}
          >
            <Image src="/images/ad_icon_p.svg" width={26} height={26} alt="" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("spt")}
          >
            <Image src="/images/spt_icon_p.svg" width={26} height={26} alt="" />
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-9 gap-4 p-4 bg-[#1a1a1a]">
        {players[position].map((player) => (
          <PlayerCard player={player} key={player.id} />
        ))}
      </div>
    </div>
  )
}
