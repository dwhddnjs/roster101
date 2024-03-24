import { PlayerTypes } from "@/types/player-types"
import { PlayersDataTypes } from "./player"

export const findPlayerByNicknameOrName = (
  players: PlayersDataTypes,
  name: string
) => {
  const objToValuesArr = Object.values(players)

  const playersArray: PlayerTypes[] = objToValuesArr.flat()

  for (const player of playersArray) {
    if (
      player.nickname.toLowerCase() === name.toLowerCase() ||
      player.name.toLowerCase() === name.toLowerCase()
    ) {
      return player
    }
  }
}
