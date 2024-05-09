"use client"

import React, { useState } from "react"
import { PlayerCard } from "./player-card"
import { PlayerTypes } from "../../../types/player-types"
import { players } from "@/lib/player"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SearchPlayerInput } from "./search-player-Input"
import { findPlayerByNicknameOrName } from "@/lib/function"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

export const PlayersContainer = () => {
  const [position, setPosition] = useState("top")
  const [searchValue, setSearchValue] = useState("")

  const isMobile = useMediaQuery("(max-width: 768px)")

  const onSelectPosition = (position: string) => {
    setPosition(position)
  }

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={cn("drop-shadow-md w-full ")}>
      <div className="w-full bg-[#1e1e1e] py-1.5 px-3 flex justify-between ">
        <div className="w-fit flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#1a1a1a]"
            onClick={() => onSelectPosition("top")}
          >
            <Image
              src="/images/top_icon_p.svg"
              width={position === "top" ? 32 : 24}
              height={position === "top" ? 32 : 24}
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
              width={position === "jgl" ? 32 : 24}
              height={position === "jgl" ? 32 : 24}
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
              width={position === "mid" ? 32 : 24}
              height={position === "mid" ? 32 : 24}
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
              width={position === "ad" ? 32 : 24}
              height={position === "ad" ? 32 : 24}
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
              width={position === "spt" ? 32 : 24}
              height={position === "spt" ? 32 : 24}
              alt=""
            />
          </Button>
        </div>
        {!isMobile ? (
          <SearchPlayerInput
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
          />
        ) : (
          <Drawer>
            <DrawerTrigger>
              <SearchIcon className="w-5 h-5 text-[#eeeeee] font-extrabold" />
            </DrawerTrigger>
            <DrawerContent className="bg-[#1a1a1a] border-[#1e1e1e] ">
              <DrawerHeader>
                <DrawerTitle className="mb-1.5">
                  <SearchPlayerInput
                    searchValue={searchValue}
                    onChangeSearchValue={onChangeSearchValue}
                  />
                </DrawerTitle>
                <DrawerDescription className="text-xs">
                  플레이어의 이름(한글) 혹은 닉네임(영어)를 <br />
                  작성해주세요.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button className="w-full">검색</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <div
        className={cn(
          "grid grid-flow-row gap-4 p-4 bg-[#1a1a1a]  min-h-[300px] border-2 border-[#1e1e1e] 3xl:grid-cols-12 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3",
          isMobile && "grid-cols-3 gap-2 p-2 h-[380px] overflow-y-scroll"
        )}
      >
        {searchValue.length === 0
          ? players[position].map((player) => (
              <PlayerCard
                player={player}
                key={player.id}
                onSelectPosition={onSelectPosition}
                setSearchValue={setSearchValue}
              />
            ))
          : findPlayerByNicknameOrName(players, searchValue).map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                setSearchValue={setSearchValue}
                onSelectPosition={onSelectPosition}
              />
            ))}
      </div>
    </div>
  )
}
