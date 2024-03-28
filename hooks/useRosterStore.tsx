import { PlayerTypes } from "@/types/player-types"
import { create } from "zustand"

export interface useRosterStoreTypes {
  roster: Array<PlayerTypes & { id: number }>
  onSelectPlayer: (player: PlayerTypes) => void
  onResetRoster: () => void
}

export const useRosterStore = create<useRosterStoreTypes>((set, get) => ({
  roster: [
    {
      id: 1,
      img: "",
      position: "top",
      nickname: "",
      name: "",
      career: [],
    },
    {
      id: 2,
      img: "",
      position: "jgl",
      nickname: "",
      name: "",
      career: [],
    },
    {
      id: 3,
      img: "",
      position: "mid",
      nickname: "",
      name: "",
      career: [],
    },
    {
      id: 4,
      img: "",
      position: "ad",
      nickname: "",
      name: "",
      career: [],
    },
    {
      id: 5,
      img: "",
      position: "spt",
      nickname: "",
      name: "",
      career: [],
    },
  ],

  onSelectPlayer: (player: PlayerTypes) => {
    const prevRoster = get().roster

    const findPlayer = prevRoster.find(
      (prevPlayer) => prevPlayer.position === player.position
    )
    if (findPlayer) {
      const updatedPlayer = {
        ...findPlayer,
        img: player.img,
        nickname: player.nickname,
        name: player.name,
        career: player.career,
      }

      const filteredRoster = prevRoster.filter(
        (prevPlayer) => prevPlayer.id !== findPlayer.id
      )

      const result = [...filteredRoster, updatedPlayer].sort(
        (a, b) => a.id - b.id
      )
      set({
        roster: result,
      })
      return
    }
    let result
    switch (player.position) {
      case "top":
        result = {
          ...player,
          id: 1,
        }
        break
      case "jgl":
        result = {
          ...player,
          id: 2,
        }
        break
      case "mid":
        result = {
          ...player,
          id: 3,
        }
        break
      case "ad":
        result = {
          ...player,
          id: 4,
        }
        break

      default:
        result = {
          ...player,
          id: 5,
        }
        break
    }
    const filteredRoster = prevRoster.filter(
      (player) => player.id !== result.id
    )
    set({
      roster: [...filteredRoster, result].sort((a, b) => a.id - b.id),
    })
  },

  onResetRoster: () => {
    set({
      roster: [
        {
          id: 1,
          img: "",
          position: "top",
          nickname: "",
          name: "",
          career: [],
        },
        {
          id: 2,
          img: "",
          position: "jgl",
          nickname: "",
          name: "",
          career: [],
        },
        {
          id: 3,
          img: "",
          position: "mid",
          nickname: "",
          name: "",
          career: [],
        },
        {
          id: 4,
          img: "",
          position: "ad",
          nickname: "",
          name: "",
          career: [],
        },
        {
          id: 5,
          img: "",
          position: "spt",
          nickname: "",
          name: "",
          career: [],
        },
      ],
    })
  },
}))
