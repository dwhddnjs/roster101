"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { error } from "console"

export const roster = async () => {
  const user = await currentUser()

  if (!user) {
    return { error: "로그인이 필요합니다" }
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
