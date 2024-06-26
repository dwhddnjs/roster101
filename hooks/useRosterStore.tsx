import { rosters } from "@/actions/rosters"
import { Player, Prisma, Roster } from "@prisma/client"
import { create } from "zustand"

export type RosterTypes = Omit<Roster, "memo"> & { memo?: Prisma.JsonValue } & {
  players: Player[]
}

type useRosterTypes = {
  rosters: Array<RosterTypes>
  action: () => void
  onSave: (roster: RosterTypes, response?: RosterTypes) => void
  isLoading: boolean
  onRemove: (rosterId: number) => void
  onUpdate: (rosterId: number, roster: RosterTypes) => void
  onResponse: (roster: RosterTypes, type: "save" | "update") => void
}

export const useRosterStore = create<useRosterTypes>((set, get) => ({
  rosters: [],
  isLoading: true,
  action: async () => {
    try {
      const res = await rosters()
      set({ rosters: res as Array<RosterTypes> })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },
  onResponse: (roster, type) => {
    const prevRoster = get().rosters
    if (type === "update") {
      const findIndex = prevRoster.findIndex((el) => el.id === roster.id)
      const newRoster = [...prevRoster]
      newRoster[findIndex] = roster
      set({
        rosters: newRoster,
      })
      return
    }

    const newRoster = [...prevRoster]
    newRoster.shift()
    set({
      rosters: [roster, ...newRoster],
    })
  },

  onSave: (roster, response) => {
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
