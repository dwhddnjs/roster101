"use client"

import React from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { players } from "@/lib/player"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
        <div className="grid grid-flow-row grid-cols-9 gap-3 ">
          {top.map((el) => (
            <div key={el.id} className="bg-[#272727] ">
              <div className="">
                <div className="">
                  <Avatar
                    key={el.id}
                    className="w-[100px] h-[100px] bg-[#1a1a1a]"
                  >
                    <AvatarImage src={el.img} />
                  </Avatar>
                </div>
                <div>
                  <h2 className="text-[#eeeeee] font-bold text-md">
                    {el.nickname}
                  </h2>
                  <p className="text-[#c4c4c4] text-xs">{el.name}</p>
                  <p className="text-[#c4c4c4] text-xs">TOP</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RosterPage
