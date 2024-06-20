"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { PlayerTypes } from "@/types/player-types"

export const updateRoster = async (
  rosterId: number,
  title: string,
  roster: PlayerTypes[]
) => {
  const user = await currentUser()

  if (!user) {
    return { error: "유저가 존재하지 않습니다" }
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
          const { id, ...result } = player
          return {
            where: {
              id: rosterId,
            },
            create: {
              ...result,
            },
          }
        }),
      },
    },
  })

  const result = await db.roster.findUnique({
    where: {
      id: rosterId,
    },
    include: {
      players: true,
    },
  })

  return {
    success: "로스터가 변경되었습니다",
    data: result,
  }
}
