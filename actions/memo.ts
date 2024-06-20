"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const memo = async (rosterId: string, memo: string) => {
  const user = await currentUser()

  if (!user) {
    return
  }

  const result = await db.roster.update({
    where: {
      id: parseInt(rosterId),
      userId: user?.id,
    },
    data: {
      memo: memo,
    },
    include: {
      players: true,
    },
  })

  return { success: "메모가 저장 되었습니다", data: result }
}
