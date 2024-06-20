"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const roster = async (rosterId: string) => {
  const user = await currentUser()

  if (!user) {
    return { error: "유저가 존재하지 않습니다" }
  }

  const result = await db.roster.findUnique({
    where: {
      id: parseInt(rosterId),
      userId: user.id,
    },
    include: {
      players: true,
    },
  })

  return result
}
