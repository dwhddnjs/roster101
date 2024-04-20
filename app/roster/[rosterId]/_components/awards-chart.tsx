"use client"

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

  const getCountByAward = (careers: any) => {
    const data: Record<number, number> = {
      2018: 0,
      2019: 0,
      2020: 0,
      2021: 0,
      2022: 0,
      2023: 0,
      2024: 0,
    }

    careers.forEach((career: string) => {
      const yearMatch = career.match(/\d{4}/)
      if (yearMatch) {
        const year = parseInt(yearMatch[0])
        const splitCareer = career.split(" ")

        if (splitCareer.includes("우승")) {
          data[year] = (data[year] || 0) + 1
        }
      }
    })
    console.log(data)

    const result = Object.entries(data).map(([year, count]) => ({
      name: year,
      total: count,
    }))

    return result
  }
  console.log(
    "getCountByAward(currentPlayer.career): ",
    getCountByAward(currentPlayer.career)
  )

  return (
    <div className="w-full h-fit relative ">
      <div className="absolute z-10 flex justify-center items-center space-x-1 top-4 right-4">
        <Trophy color="#555555" className="w-5 h-5 font-bold" />
        <p className="text-[#555555] font-bold text-sm">우승횟수</p>
      </div>
      <ResponsiveContainer
        width="100%"
        height={440}
        className="bg-[#1e1e1e] drop-shadow-lg pt-[24px] "
      >
        <BarChart data={getCountByAward(currentPlayer.career)}>
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
