"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { PlayerTypes } from "@/types/player-types"

export const savePlayer = async (player: Partial<PlayerTypes>) => {
  const user = await currentUser()

  if (!user) {
    return { error: "유저가 존재하지 않습니다" }
  }

  const prevPlayerList = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      playerList: true,
    },
  })

  const playerListParseJson = JSON.parse(prevPlayerList?.playerList as string)

  const positionAddedNewPlayer = [
    ...playerListParseJson[`${player.position}`],
    player,
  ]

  console.log("playerListParseJson: ", playerListParseJson)

  const newPlayerList = {
    ...playerListParseJson,
    [`${player.position}`]: positionAddedNewPlayer,
  }

  const result = JSON.stringify(newPlayerList)

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      playerList: result,
    },
  })

  return { success: "로스터가 생성 되었습니다", data: "" }
}
