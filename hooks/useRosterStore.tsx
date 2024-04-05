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
  onUpdate: (rosterId: number, roster: RosterTypes) => void
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

  onSave: (roster) => {
    const prevRoster = get().rosters
    set({
      rosters: [roster, ...prevRoster],
    })
  },
  onUpdate: (rosterId, roster) => {
    const prevRoster = get().rosters
    const findIndex = prevRoster.findIndex((el) => el.id === rosterId)
    const newRoster = [...prevRoster]
    newRoster[findIndex] = roster
    set({
      rosters: newRoster,
    })
  },
  onRemove: (rosterId: number) => {
    const prevRosters = get().rosters
    set({
      rosters: prevRosters.filter((roster) => roster.id !== rosterId),
    })
  },
}))
