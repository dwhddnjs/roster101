import { getTotalCountByAward, TotalCountParamTypes } from "@/lib/function"
import { cn } from "@/lib/utils"
import { Player } from "@prisma/client"
import React from "react"
import { useMediaQuery } from "usehooks-ts"

interface VerticalTextProps {
  title: string
  player: Player
  type: TotalCountParamTypes
}

export const VerticalText = ({ player, type, title }: VerticalTextProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <div className="flex flex-col justify-center items-center">
      <h3
        className={cn(
          "text-[#c4c4c4] text-md font-semibold",
          isMobile && "text-[10px] leading-4"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-[#555555] font-semibold",
          isMobile && "text-[10px] leading-4"
        )}
      >
        {getTotalCountByAward(type, player.career)}
      </p>
    </div>
  )
}
