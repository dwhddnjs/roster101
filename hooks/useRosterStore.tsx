import { roster } from "@/actions/roster"
import { Player, Roster } from "@prisma/client"
import { create } from "zustand"

export type RosterTypes = Roster & { players: Player[] }

type useRosterTypes = {
  rosters: Array<RosterTypes>
  action: () => void
  onUpdateRoster: (roster: RosterTypes) => void
  isLoading: boolean
}

export const useRosterStore = create<useRosterTypes>((set, get) => ({
  rosters: [],
  isLoading: false,
  action: async () => {
    set({ isLoading: true })
    try {
      const res = await roster()
      set({ rosters: res as Array<RosterTypes> })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },
  onUpdateRoster: (roster: RosterTypes) => {
    const prevRoster = get().rosters
    set({
      rosters: [roster, ...prevRoster],
    })
  },
}))
