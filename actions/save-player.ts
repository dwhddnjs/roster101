"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { PlayerTypes } from "@/types/player-types"

export const savePlayer = async (player: Partial<PlayerTypes>) => {
  const user = await currentUser()

  if (!user) {
    return { error: "유저가 존재하지 않습니다" }
  }

  return { success: "로스터가 생성 되었습니다", data: "" }
}
