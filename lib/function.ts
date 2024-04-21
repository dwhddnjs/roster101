import { PlayerTypes } from "@/types/player-types"
import { PlayersDataTypes } from "./player"
import TopIcon from "@/public/images/top_icon_p.svg"
import JglIcon from "@/public/images/jgl_icon_p.svg"
import MidIcon from "@/public/images/mid_icon_p.svg"
import AdIcon from "@/public/images/ad_icon_p.svg"
import SptIcon from "@/public/images/spt_icon_p.svg"

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

export const removeHtmlAndQuote = (text: string) => {
  const result = text.replace(/<\/?b>/g, "").replace(/&quot;/g, "")

  return result.replace(/LCK/g, "LCK")
}

export const renderPositionImg = (position: string) => {
  let result
  switch (position) {
    case "top":
      result = TopIcon
      break
    case "jgl":
      result = JglIcon
      break
    case "mid":
      result = MidIcon
      break
    case "ad":
      result = AdIcon
      break
    default:
      result = SptIcon
      break
  }
  return result
}

export const getCountByAward = (careers: string[]) => {
  const data: Record<number, number> = {
    2018: 0,
    2019: 0,
    2020: 0,
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
  }

  if (careers) {
    careers.forEach((career: string) => {
      const yearMatch = career.match(/\d{4}/)
      if (yearMatch) {
        const year = parseInt(yearMatch[0])
        const splitCareer = career.split(" ")

        if (splitCareer.includes("우승")) {
          data[year] = (data[year] || 0) + 1
        }
      }
    })

    const result = Object.entries(data).map(([year, count]) => ({
      name: year,
      total: count,
    }))
    return result
  }
}
