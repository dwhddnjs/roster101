import { playerList } from "@/actions/player-list"
import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    if (id) {
      const user = await db.user.findUnique({
        where: { id },
      })
      return user
    }
  } catch (error) {
    return null
  }
}

export const getUserfromPlayerList = async (id: string) => {
  try {
    if (id) {
      const user = await db.user.findUnique({
        where: { id },
        select: {
          playerList: true,
        },
      })
      if (!user) {
        console.log("유저가 존재하지않습니다")
      }

      return JSON.parse(user?.playerList as string)
    }
  } catch (error) {
    return null
  }
}
