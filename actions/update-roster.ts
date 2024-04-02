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

  if (prevPlayers) {
    const newPlayers = roster.map((player) => {
      const find = prevPlayers.players.find(
        (prevPlayer) => player.position === prevPlayer.position
      )
      if (find) {
        return {
          ...player,
          id: find.id,
          rosterId: rosterId,
        }
      }
    })

    // console.log("newPlayers: ", newPlayers)

    await db.roster.update({
      where: {
        id: rosterId,
        userId: user.id,
      },
      data: {
        players: {
          set: newPlayers as any,
        },
      },
    })
  }
}
