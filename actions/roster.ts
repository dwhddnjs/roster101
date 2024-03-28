"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const roster = async () => {
  const user = await currentUser()

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
