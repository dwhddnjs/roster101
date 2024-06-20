import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { VerticalText } from "@/components/vertical-text"
import { renderPositionImg } from "@/lib/function"
import { cn } from "@/lib/utils"
import { Player } from "@prisma/client"
import Image from "next/image"
import React from "react"
import { useMediaQuery } from "usehooks-ts"

interface PlayerTableProps {
  players?: Player[]
}

export const PlayerTable = ({ players }: PlayerTableProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (!players) {
    return null
  }

  return (
    <div
      className={cn(
        "w-1/2 min-w-[803px] h-[450px] border-2 border-[#1e1e1e] bg-[#1e1e1e] flex flex-col justify-center drop-shadow-lg ",
        isMobile && "min-w-0 w-full h-[200px] "
      )}
    >
      {players.map((player) => (
        <div
          key={player.id}
          className={cn(
            "flex px-[24px] py-[17px] items-center space-x-12 ",
            isMobile && "px-2.5 py-0 space-x-0 "
          )}
        >
          <div
            className={cn(
              "flex justify-center items-center space-x-4 ",
              isMobile && "space-x-3"
            )}
          >
            <Avatar
              className={cn(
                "bg-[#191919] w-[53px] h-[53px]",
                isMobile && "w-[32px] h-[32px]"
              )}
            >
              <AvatarImage src={player.img} />
            </Avatar>
            <div className="w-[80px]">
              <h3
                className={cn(
                  "text-[#eeeeee] text-md font-semibold",
                  isMobile && "text-sm"
                )}
              >
                {player.nickname}
              </h3>
              <p className={cn("text-[#555555]", isMobile && "text-xs")}>
                {player.name}
              </p>
            </div>
          </div>

          <div className="flex justify-between w-full items-center">
            <div className={cn("flex space-x-14", isMobile && "space-x-2.5")}>
              <VerticalText title="우승" type="championship" player={player} />
              <VerticalText title="준우승" type="runnerUp" player={player} />
              <VerticalText title="LCK" type="lck" player={player} />
              <VerticalText title="MSI" type="msi" player={player} />
              <VerticalText title="Worlds" type="worlds" player={player} />
            </div>
            <div>
              <Image
                src={renderPositionImg(player.position)}
                width={isMobile ? 16 : 32}
                height={isMobile ? 16 : 32}
                alt="roster101 position_icon"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
