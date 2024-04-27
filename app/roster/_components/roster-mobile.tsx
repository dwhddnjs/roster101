"use client"

import React from "react"
import { RosterBox } from "./roster-box"
import { PlayersContainer } from "./players-container"

export const RosterMobile = () => {
  return (
    <div className="pt-[60px] w-full h-full flex flex-col justify-between space-y-5 ">
      <div className="space-y-1 ml-3  px-[18px]">
        <h3 className="text-2xl text-[#eeeeee] font-bold">Roster</h3>
        <p className="text-sm text-[#c4c4c4]">당신의 로스터를 구성해보세요</p>
      </div>
      <div className="w-full h-full  px-[18px]">
        <PlayersContainer />
      </div>
      <RosterBox />
    </div>
  )
}
