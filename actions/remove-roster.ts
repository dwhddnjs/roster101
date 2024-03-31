"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const removeRoster = async (rosterId: number) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  if (rosterId) {
    return { error: "로스터를 존재하지 않습니다" }
  }

  await db.roster.delete({
    where: {
      id: rosterId,
      userId: user.id,
    },
  })

  return { success: "로스터가 삭제되었습니다" }
}
