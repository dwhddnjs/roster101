"use client"

import { playerList } from "@/actions/player-list"
import { create } from "zustand"
import { PlayerTypes } from "@/types/player-types"
import playerData from "@/playerData.json"

type PlayerListType = {
  [key: string]: PlayerTypes[]
}

type UsePlayerListStoreTypes = {
  playerList: PlayerListType | null
  action: () => void
  isLoading: boolean
}

export const usePlayerListStore = create<UsePlayerListStoreTypes>(
  (set, get) => ({
    isLoading: true,
    playerList: null,
    action: async () => {
      try {
        const res = await playerList()

        if (res) {
          set({
            playerList: res.playerList,
          })
        } else {
          set({ playerList: playerData })
        }
      } catch (error) {
        console.log(error)
      } finally {
        set({ isLoading: false })
      }
    },
  })
)
