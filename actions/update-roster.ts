"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { PlayerTypes } from "@/types/player-types"
import { Player, Roster } from "@prisma/client"

export const updateRoster = async (
  rosterId: number,
  title: string,
  roster: PlayerTypes[]
) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  if (!title) {
    return { error: "로스터 이름을 작성해주세요" }
  }

  const prevPlayers = await db.roster.findUnique({
    where: {
      id: rosterId,
      userId: user.id,
    },
    select: {
      players: true,
    },
  })

  const mapPlayers = roster.map((player) => {
    const { id, ...rest } = player

    return {
      ...rest,
      rosterId,
    }
  })

  await db.player.deleteMany({
    where: {
      rosterId: rosterId,
    },
  })

  const newRoster = await db.player.createMany({
    data: mapPlayers,
  })
  // console.log("newRoster: ", newRoster)

  await db.roster.update({
    where: {
      id: rosterId,
      userId: user.id,
    },
    data: {
      players: {
        set: newRoster as any,
      },
    },
  })
}
