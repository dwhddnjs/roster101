"use client"

import { playerList } from "@/actions/player-list"
import { create } from "zustand"
import { useUser } from "./useUser"
import { currentUser } from "@/lib/auth"
import { PlayerTypes } from "@/types/player-types"
import playerData from "@/playerData.json"

type usePlayerListStoreTypes = {
  playerList: {
    [key: string]: PlayerTypes[]
  } | null
  action: () => void
  isLoading: boolean
}

export const usePlayerListStore = create<usePlayerListStoreTypes>(
  (set, get) => ({
    isLoading: true,
    playerList: null,
    action: async () => {
      try {
        const res = await playerList()
        if (res) {
          const parseData = JSON.parse(res.playerList as any)
          set({ playerList: parseData })
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
