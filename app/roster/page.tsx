"use client"

import React from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { players } from "@/lib/player"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlayerCard } from "./_components/player-card"

function RosterPage() {
  const { top } = players

  return (
    <div className="w-full h-full flex ">
      {/* <Button onClick={() => signOut()}>로그아웃</Button> */}
      <div className="w-[18%] h-full bg-[#191919]"></div>
      <div className="w-[82%] h-full pt-24 px-[48px]">
        <div className="space-y-1">
          <h3 className="text-4xl text-[#eeeeee] font-bold">Roster</h3>
          <p className="text-md text-[#c4c4c4]">당신의 로스터를 구성해보세요</p>
        </div>
        <div className="grid grid-flow-row grid-cols-9 gap-4 ">
          {top.map((player) => (
            <PlayerCard player={player} key={player.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RosterPage
