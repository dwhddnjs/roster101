import { roster } from "@/actions/roster"
import { Player, Roster } from "@prisma/client"
import { create } from "zustand"

export type RosterTypes = Roster & { players: Player[] }

type useRosterTypes = {
  rosters: Array<RosterTypes>
  action: () => void
  onSave: (roster: RosterTypes) => void
  isLoading: boolean
  onRemove: (rosterId: number) => void
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

  onSave: (roster: RosterTypes) => {
    const prevRoster = get().rosters
    set({
      rosters: [roster, ...prevRoster],
    })
  },
  onUpdate: () => {},
  onRemove: (rosterId: number) => {
    const prevRosters = get().rosters
    set({
      rosters: prevRosters.filter((roster) => roster.id !== rosterId),
    })
  },
}))
