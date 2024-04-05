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

  await db.player.deleteMany({
    where: {
      rosterId: rosterId,
    },
  })

  await db.roster.update({
    where: {
      id: rosterId,
      userId: user.id,
    },
    data: {
      title,
      players: {
        connectOrCreate: roster.map((player) => {
          return {
            where: {
              id: rosterId,
            },
            create: {
              ...player,
            },
          }
        }),
      },
    },
  })

  return {
    success: "로스터가 변경되었습니다",
  }
}
