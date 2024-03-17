"use client"

import React from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { players } from "@/lib/player"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

function RosterPage() {
  const { top } = players

  return (
    <div>
      <Button onClick={() => signOut()}>로그아웃</Button>
      <div>
        {top.map((el) => (
          <Avatar key={el.id} className="w-[100px] h-[100px]">
            <AvatarImage src={el.img} />
          </Avatar>
        ))}
      </div>

      {/* <div>
        <Image
          src="https://i.namu.wiki/i/B4MGLTOgkEUX_MI4ghCOa-n5NWVK7FZnld3hKIa0TIvYTEiB_DCbPUlFpd8nvsMW3NW1TDRItJ9aqrJccZZhU36USArzraEOCJ0_Oc5Y4FnE-Vmfe1uw_6B1snrIXb1Edt_22XBRV5PQs3RczQiNWA.webp"
          width={150}
          height={80}
          alt=""
        />
      </div> */}
    </div>
  )
}

export default RosterPage
