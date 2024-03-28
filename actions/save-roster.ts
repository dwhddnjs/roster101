"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

import { PlayerTypes } from "@/types/player-types"

export const saveRoster = async (roster: PlayerTypes[], title: string) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  if (!title) {
    return { error: "로스터 이름을 작성해주세요" }
  }

  const newRoster = await db.roster.create({
    data: {
      title,
      user: {
        connect: { id: user.id },
      },
    },
  })

  const mapPlayers = roster.map((player) => {
    const { id, ...rest } = player

    return {
      ...rest,
      rosterId: newRoster.id,
    }
  })

  await db.player.createMany({
    data: mapPlayers,
  })

  return { success: "로스터가 생성 되었습니다" }
}
