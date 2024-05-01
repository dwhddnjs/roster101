import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { renderPositionImg } from "@/lib/function"
import { Player } from "@prisma/client"
import Image from "next/image"
import React from "react"

interface PlayerTableProps {
  players?: Player[]
}

export const PlayerTable = ({ players }: PlayerTableProps) => {
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
    <div className="w-1/2 min-w-[803px] h-[450px] border-2 border-[#1e1e1e] bg-[#1e1e1e] flex flex-col justify-center drop-shadow-lg ">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex px-[24px] py-[17px] items-center space-x-12"
        >
          <div className="flex justify-center items-end space-x-4">
            <Avatar className="bg-[#191919] w-[53px] h-[53px]">
              <AvatarImage src={player.img} />
            </Avatar>
            <div className="w-[80px]">
              <h3 className="text-[#eeeeee] text-md font-semibold">
                {player.nickname}
              </h3>
              <p className="text-[#555555]">{player.name}</p>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex space-x-20">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-[#eeeeee] text-md font-semibold">우승</h3>
                <p className="text-[#555555] font-semibold">
                  {getTotalCountByAward("championship", player.career)}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-[#eeeeee] text-md font-semibold">준우승</h3>
                <p className="text-[#555555] font-semibold">
                  {getTotalCountByAward("runnerUp", player.career)}
                </p>
              </div>
            </div>
            <div>
              <Image
                src={renderPositionImg(player.position)}
                width={32}
                height={32}
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
