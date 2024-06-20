"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const playerList = async () => {
  const user = await currentUser()

  if (!user) {
    return
  }

  const getPlayerList = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      playerList: true,
    },
  })

  const result = {
    playerList: JSON.parse(getPlayerList?.playerList as string),
  }

  return result
}
