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

  const result = playersArray.filter(
    (el) =>
      el.name.toLowerCase().includes(name.toLowerCase()) ||
      el.nickname.toLowerCase().includes(name.toLowerCase())
  )
  return result.map((el, i) => ({ ...el, id: i + 1 }))
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

export type TotalCountParamTypes =
  | "runnerUp"
  | "championship"
  | "lck"
  | "worlds"
  | "msi"

export const getTotalCountByAward = (
  type: TotalCountParamTypes,
  careers: string[]
) => {
  let runnerUpCount = 0
  let championshipCount = 0
  let lck = 0
  let worlds = 0
  let msi = 0
  let result

  careers.forEach((career: string) => {
    const splitCareer = career.split(" ")

    if (splitCareer.includes("우승")) {
      championshipCount = championshipCount + 1
      if (splitCareer.includes("LCK")) {
        lck = lck + 1
      }

      if (splitCareer.includes("MSI")) {
        msi = msi + 1
      }

      if (splitCareer.includes("Worlds")) {
        worlds = worlds + 1
      }
    }

    if (splitCareer.includes("준우승")) {
      runnerUpCount = runnerUpCount + 1
    }
  })

  switch (type) {
    case "runnerUp":
      result = runnerUpCount
      break
    case "championship":
      result = championshipCount
      break
    case "lck":
      result = lck
      break
    case "worlds":
      result = worlds
      break
    default:
      result = msi
      break
  }
  return result
}
