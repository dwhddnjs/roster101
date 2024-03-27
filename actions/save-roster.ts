"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/prisma/data/user"
import { PlayerTypes } from "@/types/player-types"
import { Player } from "@prisma/client"

export const saveRoster = async (roster: PlayerTypes[], title: string) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const existingUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      roster: true,
    },
  })

  const newRoster = await db.roster.create({
    data: {
      title,
      userId: user.id as string,
    },
  })
  //   const newPlayers = await db.player.create({
  //     data: {

  //     }
  //   })
}
