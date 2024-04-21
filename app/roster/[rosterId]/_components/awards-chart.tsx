"use client"

import { getCountByAward } from "@/lib/function"
import { Player } from "@prisma/client"
import { Trophy } from "lucide-react"
import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

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
  if (!players) {
    return null
  }
  const currentPlayer = players[current - 1]

  return (
    <div className="w-full h-fit relative ">
      <div className="absolute z-10 flex justify-center items-center space-x-1 top-4 right-4">
        <Trophy color="#c4c4c4" className="w-5 h-5 font-bold" />
        <p className="text-[#c4c4c4] font-bold text-sm">우승횟수</p>
      </div>
      <ResponsiveContainer
        width="100%"
        height={440}
        className="bg-[#1e1e1e] drop-shadow-lg pt-[24px] "
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
