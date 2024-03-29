import { roster } from "@/actions/roster"
import { Player, Roster } from "@prisma/client"
import { create } from "zustand"

type useRosterTypes = {
  rosters: Array<Roster & { players: Player[] }>
  action: () => void
  onUpdateRoster: (roster: any) => void
}

export const useRosterStore = create<useRosterTypes>((set) => ({
  rosters: [],
  action: async () => {
    const res = await roster()
    console.log("res: ", res)
    set({ rosters: res })
  },
  onUpdateRoster: (roster: any) => set({ rosters: roster }),
}))
