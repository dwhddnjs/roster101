"use client"

import React, { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { players } from "@/lib/player"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlayerCard } from "./_components/player-card"
import { PlayersContainer } from "./_components/players-container"
import { RosterBox } from "./_components/roster-box"
import { useMyRoster } from "@/hooks/useMyRoster"
import { RosterSidebar } from "./_components/roster-sidebar"

function RosterPage() {
  return (
    <div className="w-full min-h-full flex">
      <RosterSidebar />
      <div className="w-[82%] h-full pt-24 px-[48px] space-y-5">
        <div className="space-y-1 ml-3">
          <h3 className="text-4xl text-[#eeeeee] font-bold">Roster</h3>
          <p className="text-md text-[#c4c4c4]">당신의 로스터를 구성해보세요</p>
        </div>
        {/* player-container */}
        <PlayersContainer />
        <div className="h-[300px]" />
      </div>
      <RosterBox />
    </div>
  )
}

export default RosterPage
