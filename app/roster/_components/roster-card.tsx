"use client"

import Image from "next/image"
import React, { FC, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Player, Roster } from "@prisma/client"
import { renderPositionImg } from "@/lib/function"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { RosterTypes, useRosterStore } from "@/hooks/useRosterStore"
import { removeRoster } from "@/actions/remove-roster"
import { toast } from "sonner"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"

interface RosterCardProps {
  roster: RosterTypes
}

export const RosterCard = ({ roster }: RosterCardProps) => {
  const [isPending, startTransition] = useTransition()
  const { onRemove, action } = useRosterStore()
  const {
    onSetPlayers,
    onSetRosterId,
    rosterId,
    onResetRoster,
    roster: any,
  } = useRosterBoxStore()

  console.log("roster: ", any)
  console.log("rosterId: ", rosterId)

  const onSetPlayersToRosterBox = () => {
    onSetRosterId(roster.id)

    if (!rosterId) {
      const players = roster.players.map((player) => {
        const { id, rosterId, ...rest } = player
        let result
        switch (rest.position) {
          case "top":
            result = { id: 1, ...rest }
            break
          case "jgl":
            result = { id: 2, ...rest }
            break
          case "mid":
            result = { id: 3, ...rest }
            break
          case "ad":
            result = { id: 4, ...rest }
            break
          default:
            result = { id: 5, ...rest }
            break
        }
        return result
      })
      onSetPlayers(players)
    } else {
      onResetRoster()
    }
  }

  const onRemoveRoster = () => {
    onRemove(roster.id)
    startTransition(() => {
      removeRoster(roster.id)
        .then((data) => {
          if (data.success) {
            return toast(data.success)
          }
          if (data.error) {
            action()
            return toast(data.error)
          }
        })
        .catch((error) => console.log(error))
    })
  }

  return (
    <div
      className={cn(
        "bg-[#1e1e1e] rounded-lg pt-[8px] px-[12px] pb-[10px] relative shadow-lg border-2 border-[#27272a]",
        rosterId === roster.id && "border-[#eeeeee]"
      )}
      onClick={onSetPlayersToRosterBox}
    >
      <div className="flex justify-between items-center mb-[4px]">
        <h3 className="text-[white] font-bold text-md ml-[4px] ">
          {roster?.title}
        </h3>
        <Button
          size={"xs"}
          className="bg-transparent"
          onClick={onRemoveRoster}
          disabled={isPending}
        >
          <X width={16} height={16} color="#c4c4c4" />
        </Button>
      </div>
      <div className="flex space-x-2 mb-2 items-center justify-center">
        {roster?.players?.map((player) => (
          <Avatar key={player.id} className="w-[48px] h-[48px] bg-[#27272a]">
            <AvatarImage src={player.img} />
          </Avatar>
        ))}
      </div>
      <div className="grid grid-cols-2 grid-flow-row space-y-[2px] ">
        {roster.players.map((player) => (
          <div
            key={player.id}
            className="flex text-[12px] text-[white] space-x-1 items-center"
          >
            <Image
              src={renderPositionImg(player.position)}
              height={16}
              width={16}
              alt=""
            />
            <p className="text-[10px] font-medium">{player?.nickname}</p>
          </div>
        ))}
      </div>
      <div className="w-0 h-0 border-t-[32px] border-t-transparent border-r-[32px] border-r-[#27272a] rounded-br-md absolute bottom-0 right-0" />
    </div>
  )
}
