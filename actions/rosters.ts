"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const rosters = async () => {
  const user = await currentUser()

  if (!user) {
    return
  }

  const existingUser = await db.user.findUnique({
    where: { id: user?.id },
    include: {
      roster: {
        orderBy: {
          id: "desc",
        },
        include: {
          players: true,
        },
      },
    },
  })

  return existingUser?.roster
}
