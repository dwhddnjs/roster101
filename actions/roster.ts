"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const roster = async (rosterId: string) => {
  const user = await currentUser()

  if (!user) {
    return
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
