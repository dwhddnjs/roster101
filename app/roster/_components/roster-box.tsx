"use client"

import Image from "next/image"
import esportIcon from "@/public/images/esport_icon.svg"
import { Button } from "@/components/ui/button"

import { Check, RotateCcw, ChevronsDown, ChevronsUp } from "lucide-react"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { renderPositionImg } from "@/lib/function"
import { useSaveRosterModalStore } from "@/hooks/useSaveRosterModalStore"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"

export const RosterBox = () => {
  const { roster, onResetRoster } = useRosterBoxStore()
  const { onOpen } = useSaveRosterModalStore()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div
      className={cn(
        "flex fixed w-fit bottom-0 left-1/2 -translate-x-1/2",
        isMobile && "w-full flex-col"
      )}
    >
      {isMobile && (
        <div className="w-full flex justify-end ">
          <div className="w-fit bg-[#272727] p-[6px] pt-[8px] pl-[12px] rounded-t-lg">
            <div className="space-x-3 flex">
              <Button
                className="font-bold bg-[#555555] rounded-[50%] w-7 h-7"
                size={"xs"}
                onClick={onOpen}
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                className="font-bold bg-[#1e1e1e] rounded-[50%] w-7 h-7"
                size={"xs"}
                onClick={onResetRoster}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isMobile && (
        <div
          className={cn(
            "w-[100px] h-[130px] border-[1px] bg-[#272727] border-[#1e1e1e] flex flex-col items-center justify-between pt-[18px] pb-[10px]",
            isMobile && "hidden"
          )}
        >
          <div className="flex flex-col justify-center items-center space-y-1">
            <Image
              src={esportIcon}
              width={32}
              height={32}
              alt="roster101 esport_icon"
            />
            <p className="text-[white] font-bold text-md">Roster</p>
          </div>
          <div className="space-x-2 flex">
            <Button
              className="font-bold bg-[#74A99C] rounded-[50%] text-xs"
              size={"xs"}
              onClick={onOpen}
            >
              <Check width={20} />
            </Button>
            <Button
              className="font-bold bg-transparent rounded-[50%]"
              size={"xs"}
              onClick={onResetRoster}
            >
              <RotateCcw width={18} />
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-row">
        {roster?.map((player) => (
          <div
            key={player?.id}
            className={cn(
              "w-[100px] h-[130px] border-[1px] bg-[#1a1a1a] border-[#272727] flex flex-col relative ",
              isMobile && "w-full h-[100px] "
            )}
          >
            <div className="p-1">
              <Image
                src={renderPositionImg(player?.position)}
                width={18}
                height={18}
                alt="roster101 position_icon"
              />
            </div>
            {player?.img && <Image src={player?.img} fill alt="player_image" />}
            {player?.nickname && (
              <p className="absolute bottom-1 right-1 text-white font-bold text-xs drop-shadow-[1px_1px_2px_#000000]">
                {player?.nickname}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
