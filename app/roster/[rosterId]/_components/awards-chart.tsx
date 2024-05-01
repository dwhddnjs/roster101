"use client"

import { getCountByAward } from "@/lib/function"
import { cn } from "@/lib/utils"
import { Player } from "@prisma/client"
import { Trophy } from "lucide-react"
import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useMediaQuery } from "usehooks-ts"

const data = [
  {
    name: "2018",
    total: 0,
  },
  {
    name: "2019",
    total: 1,
  },
  {
    name: "2020",
    total: 1,
  },
  {
    name: "2021",
    total: 2,
  },
  {
    name: "2022",
    total: 1,
  },
  {
    name: "2023",
    total: 3,
  },
  {
    name: "2024",
    total: 4,
  },
]

interface AwardsChart {
  players?: Player[]
  current: number
}

export const AwardsChart = ({ players, current }: AwardsChart) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  if (!players) {
    return null
  }
  const currentPlayer = players[current - 1]

  return (
    <div className="w-full h-fit relative flex ">
      <div className="absolute z-10 flex flex-col justify-center items-center  top-5 right-6">
        <Trophy color="#555555" className="w-5 h-5 font-bold" />
      </div>
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 200 : 445}
        className={cn("bg-[#1e1e1e] drop-shadow-lg pt-[24px] ", isMobile && "")}
      >
        <BarChart data={getCountByAward(currentPlayer?.career)}>
          <XAxis
            dataKey="name"
            stroke="#555555"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#555555"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            ticks={[1, 2, 3, 4]}
            unit="회"
          />
          <Bar dataKey="total" fill="#c4c4c4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
