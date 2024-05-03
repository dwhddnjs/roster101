import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
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

  const getTotalCountByAward = (type: string, careers: string[]) => {
    let runnerUpCount = 0
    let championshipCount = 0

    careers.forEach((career: string) => {
      const splitCareer = career.split(" ")

      if (splitCareer.includes("우승")) {
        championshipCount = championshipCount + 1
      }

      if (splitCareer.includes("준우승")) {
        runnerUpCount = runnerUpCount + 1
      }
    })

    if (type === "runnerUp") {
      return runnerUpCount
    }

    if (type === "championship") {
      return championshipCount
    }
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
            "flex px-[24px] py-[17px] items-center space-x-12",
            isMobile && "px-[18px] py-0 space-x-0"
          )}
        >
          <div className="flex justify-center items-center space-x-4">
            <Avatar
              className={cn(
                "bg-[#191919] w-[53px] h-[53px]",
                isMobile && "w-[32px] h-[32px]"
              )}
            >
              <AvatarImage src={player.img} />
            </Avatar>
            <div className="w-[90px]">
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
            <div className={cn("flex space-x-20", isMobile && "space-x-12")}>
              <div className="flex flex-col justify-center items-center">
                <h3
                  className={cn(
                    "text-[#eeeeee] text-md font-semibold",
                    isMobile && "text-xs"
                  )}
                >
                  우승
                </h3>
                <p
                  className={cn(
                    "text-[#555555] font-semibold",
                    isMobile && "text-xs"
                  )}
                >
                  {getTotalCountByAward("championship", player.career)}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h3
                  className={cn(
                    "text-[#eeeeee] text-md font-semibold",
                    isMobile && "text-xs"
                  )}
                >
                  준우승
                </h3>
                <p
                  className={cn(
                    "text-[#555555] font-semibold",
                    isMobile && "text-xs"
                  )}
                >
                  {getTotalCountByAward("runnerUp", player.career)}
                </p>
              </div>
            </div>
            <div>
              <Image
                src={renderPositionImg(player.position)}
                width={isMobile ? 18 : 32}
                height={isMobile ? 18 : 32}
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
