import React, { useState } from "react"
import { PlayerCard } from "./player-card"
import { PlayerTypes } from "../../../types/player-types"
import { players } from "@/lib/player"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SearchPlayerInput } from "./search-player-Input"
import { findPlayerByNicknameOrName } from "@/lib/function"

export const PlayersContainer = () => {
  const [position, setPosition] = useState("top")
  const [searchValue, setSearchValue] = useState("")

  const onSelectPosition = (position: string) => {
    setPosition(position)
  }

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="border-[4px] border-[#1e1e1e] drop-shadow-md ">
      <div className=" w-full bg-[#1e1e1e] py-3 px-4 flex justify-between">
        <div className="w-fit flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("top")}
          >
            <Image
              src="/images/top_icon_p.svg"
              width={position === "top" ? 36 : 26}
              height={position === "top" ? 36 : 26}
              alt=""
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("jgl")}
          >
            <Image
              src="/images/jgl_icon_p.svg"
              width={position === "jgl" ? 36 : 26}
              height={position === "jgl" ? 36 : 26}
              alt=""
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("mid")}
          >
            <Image
              src="/images/mid_icon_p.svg"
              width={position === "mid" ? 36 : 26}
              height={position === "mid" ? 36 : 26}
              alt=""
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("ad")}
          >
            <Image
              src="/images/ad_icon_p.svg"
              width={position === "ad" ? 36 : 26}
              height={position === "ad" ? 36 : 26}
              alt=""
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("spt")}
          >
            <Image
              src="/images/spt_icon_p.svg"
              width={position === "spt" ? 36 : 26}
              height={position === "spt" ? 36 : 26}
              alt=""
            />
          </Button>
        </div>
        <SearchPlayerInput
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
        />
      </div>
      <div className="grid grid-flow-row grid-cols-9 gap-4 p-4 bg-[#1a1a1a] min-h-[300px]">
        {searchValue.length === 0 ? (
          players[position].map((player) => (
            <PlayerCard player={player} key={player.id} />
          ))
        ) : (
          <PlayerCard
            player={
              findPlayerByNicknameOrName(players, searchValue) as PlayerTypes
            }
          />
        )}
      </div>
    </div>
  )
}
